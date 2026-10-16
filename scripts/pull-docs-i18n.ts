import { execFile } from 'node:child_process'
import {
  lstat,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
  writeFile,
} from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { promisify } from 'node:util'

const exec = promisify(execFile)
const officialSource = 'https://github.com/element-plus/docs-i18n.git'
const pendingNotice =
  '> **待翻译**：官方暂未提供此页面的中文翻译，以下为英文原文。\n\n'

type SyncOptions = {
  repoRoot: string
  sourceUrl?: string
  tempRoot?: string
}

async function exists(path: string) {
  try {
    return await lstat(path)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return undefined
    throw error
  }
}

async function listFiles(root: string, suffix: string): Promise<string[]> {
  const stat = await exists(root)
  if (!stat) return []
  if (stat.isSymbolicLink()) throw new Error(`不允许符号链接：${root}`)
  const entries = await readdir(root, { withFileTypes: true })
  const nested = await Promise.all(
    entries.map(async (entry) => {
      if (entry.isSymbolicLink())
        throw new Error(`不允许符号链接：${join(root, entry.name)}`)
      if (entry.isDirectory()) {
        return (await listFiles(join(root, entry.name), suffix)).map((file) =>
          join(entry.name, file)
        )
      }
      return entry.isFile() && entry.name.endsWith(suffix) ? [entry.name] : []
    })
  )
  return nested.flat().sort()
}

async function assertClean(repoRoot: string) {
  const { stdout } = await exec(
    'git',
    ['status', '--porcelain', '--untracked-files=all', '--', 'docs/zh-CN'],
    { cwd: repoRoot }
  )
  if (stdout.trim())
    throw new Error(
      `中文文档存在未提交改动，请先保存到 Git：\n${stdout.trimEnd()}`
    )
}

function jsonShape(value: unknown, path = ''): string[] {
  if (Array.isArray(value))
    return [
      `${path}:array`,
      ...value.flatMap((item, index) => jsonShape(item, `${path}[${index}]`)),
    ]
  if (value !== null && typeof value === 'object') {
    return [
      `${path}:object`,
      ...Object.entries(value).flatMap(([key, item]) =>
        jsonShape(item, path ? `${path}.${key}` : key)
      ),
    ]
  }
  return [`${path}:${typeof value}`]
}

async function compareJson(repoRoot: string) {
  const root = join(repoRoot, 'docs/.vitepress/crowdin')
  const files = await listFiles(join(root, 'en-US'), '.json')
  const differences: string[] = []
  for (const file of files) {
    const en = JSON.parse(await readFile(join(root, 'en-US', file), 'utf8'))
    const target = join(root, 'zh-CN', file)
    if (!(await exists(target))) {
      differences.push(`${file}: missing file`)
      continue
    }
    const zh = JSON.parse(await readFile(target, 'utf8'))
    const enShape = jsonShape(en)
    const zhShape = jsonShape(zh)
    differences.push(
      ...enShape
        .filter((key) => !zhShape.includes(key))
        .map((key) => `${file}: missing ${key.split(':')[0]}`)
    )
    differences.push(
      ...zhShape
        .filter((key) => !enShape.includes(key))
        .map((key) => `${file}: extra or different type ${key.split(':')[0]}`)
    )
  }
  return differences
}

function englishFallback(content: string) {
  const translated = content.replace(
    /^(---\r?\n)([\s\S]*?)(\r?\n---\r?\n)/,
    (_, start, frontmatter, end) => {
      const metadata = /^lang\s*:/m.test(frontmatter)
        ? frontmatter.replace(/^lang\s*:.*$/m, 'lang: zh-CN')
        : `${frontmatter}\nlang: zh-CN`
      return `${start}${metadata}${end}${pendingNotice}`
    }
  )
  return translated === content
    ? `---\nlang: zh-CN\n---\n\n${pendingNotice}${content}`
    : translated
}

async function preparePages(sourceRoot: string) {
  const files = await listFiles(sourceRoot, '.md')
  if (!files.length) throw new Error('未找到官方中文 Markdown 文档')
  return Promise.all(
    files.map(async (file) => {
      const content = (await readFile(join(sourceRoot, file), 'utf8')).replace(
        /^\uFEFF/,
        ''
      )
      const frontmatter = content.match(
        /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/
      )
      if (
        !frontmatter ||
        !/^lang:\s*['"]?zh-CN['"]?\s*$/m.test(frontmatter[1]) ||
        !frontmatter[2].trim()
      ) {
        throw new Error(`无效中文文档：${file}`)
      }
      return { file, content }
    })
  )
}

export async function syncChineseDocs({
  repoRoot,
  sourceUrl = officialSource,
  tempRoot = tmpdir(),
}: SyncOptions) {
  await assertClean(repoRoot)
  const temp = await mkdtemp(join(tempRoot, 'element-plus-docs-i18n-'))
  try {
    const checkout = join(temp, 'source')
    await exec('git', [
      'clone',
      '--depth',
      '1',
      '--branch',
      'main',
      '--single-branch',
      '--',
      sourceUrl,
      checkout,
    ])
    const { stdout } = await exec('git', ['rev-parse', 'HEAD'], {
      cwd: checkout,
    })
    const pages = await preparePages(join(checkout, 'zh-CN'))
    const target = join(repoRoot, 'docs/zh-CN')
    const local = await listFiles(target, '.md')
    const english = await listFiles(join(repoRoot, 'docs/en-US'), '.md')
    const remote = new Set(pages.map(({ file }) => file))
    const fallbackCandidates = english.filter((file) => !remote.has(file))
    const fallbackStatus = await Promise.all(
      fallbackCandidates.map(async (file) => ({
        file,
        generated:
          !local.includes(file) ||
          (await readFile(join(target, file), 'utf8')).includes(pendingNotice),
      }))
    )
    const fallback = fallbackStatus
      .filter(({ generated }) => generated)
      .map(({ file }) => file)
    const fallbackPages = await Promise.all(
      fallback.map(async (file) => ({
        file,
        content: englishFallback(
          await readFile(join(repoRoot, 'docs/en-US', file), 'utf8')
        ),
      }))
    )
    const jsonDifferences = await compareJson(repoRoot)
    // Validate every download and local path before writing any page.
    await assertClean(repoRoot)
    let added = 0
    let updated = 0
    for (const { file, content } of [...pages, ...fallbackPages]) {
      const path = join(target, file)
      if (await exists(path)) {
        if ((await readFile(path, 'utf8')) === content) continue
        updated++
      } else {
        added++
      }
      await mkdir(dirname(path), { recursive: true })
      await writeFile(path, content)
    }
    return {
      revision: stdout.trim(),
      added,
      updated,
      fallback,
      stale: local.filter((file) => !remote.has(file)),
      jsonDifferences,
    }
  } finally {
    await rm(temp, { recursive: true, force: true })
  }
}

async function main() {
  const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
  const result = await syncChineseDocs({ repoRoot })
  process.stdout.write(
    `官方源：${officialSource}\n提交：${result.revision}\n新增 ${result.added}，更新 ${result.updated}\n`
  )
  process.stdout.write(
    `英文补位（待翻译）：${result.fallback.join(', ') || '无'}\n`
  )
  process.stdout.write(
    `远端未提供或已移除（保留本地）：${result.stale.join(', ') || '无'}\n`
  )
  for (const difference of result.jsonDifferences)
    process.stderr.write(`界面翻译结构差异：${difference}\n`)
  const { stdout, stderr } = await exec('pnpm', ['docs:gen-locale'], {
    cwd: repoRoot,
  })
  if (stdout) process.stdout.write(stdout)
  if (stderr) process.stderr.write(stderr)
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error)
    process.exitCode = 1
  })
}
