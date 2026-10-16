// @vitest-environment node
import { execFileSync } from 'node:child_process'
import {
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
  symlink,
  writeFile,
} from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { syncChineseDocs } from '../pull-docs-i18n'

let root: string
let repo: string
let source: string
let tempRoot: string
const page = (body: string, lang = 'zh-CN') =>
  `---\ntitle: Button\nlang: ${lang}\n---\n\n# ${body}\n`
const git = (cwd: string, ...args: string[]) =>
  execFileSync('git', args, { cwd, encoding: 'utf8', stdio: 'pipe' }).trim()
async function put(base: string, file: string, content: string) {
  await mkdir(dirname(join(base, file)), { recursive: true })
  await writeFile(join(base, file), content)
}
const commit = (cwd: string) => {
  git(cwd, 'add', '.')
  git(
    cwd,
    '-c',
    'user.name=Test',
    '-c',
    'user.email=test@example.com',
    'commit',
    '-m',
    'fixture'
  )
}
const run = () =>
  syncChineseDocs({ repoRoot: repo, sourceUrl: source, tempRoot })

beforeEach(async () => {
  root = await mkdtemp(join(tmpdir(), 'docs-sync-test-'))
  repo = join(root, 'repo')
  source = join(root, 'source')
  tempRoot = join(root, 'temp')
  await Promise.all([repo, source, tempRoot].map((dir) => mkdir(dir)))
  git(repo, 'init', '-b', 'main')
  git(source, 'init', '-b', 'main')
  await put(repo, 'docs/en-US/component/button.md', page('Button', 'en-US'))
  await put(repo, 'docs/en-US/guide/new.md', page('New guide', 'en-US'))
  await put(repo, 'docs/zh-CN/component/button.md', page('Old translation'))
  await put(repo, 'docs/zh-CN/stale.md', page('Stale'))
  await put(
    repo,
    'docs/.vitepress/crowdin/en-US/common.json',
    JSON.stringify({ title: 'Title', missing: 'Missing' })
  )
  await put(
    repo,
    'docs/.vitepress/crowdin/zh-CN/common.json',
    JSON.stringify({ title: '标题' })
  )
  await put(source, 'zh-CN/component/button.md', page('按钮'))
  commit(repo)
  commit(source)
})
afterEach(async () => rm(root, { recursive: true, force: true }))

describe('syncChineseDocs', () => {
  it('updates official pages, adds marked English fallbacks, preserves stale files and reports JSON differences', async () => {
    const result = await run()
    expect(result.revision).toBe(git(source, 'rev-parse', 'HEAD'))
    expect(result.updated).toBe(1)
    expect(result.added).toBe(1)
    expect(result.fallback).toEqual(['guide/new.md'])
    expect(result.stale).toEqual(['stale.md'])
    expect(result.jsonDifferences).toContain('common.json: missing missing')
    expect(
      await readFile(join(repo, 'docs/zh-CN/component/button.md'), 'utf8')
    ).toContain('按钮')
    expect(
      await readFile(join(repo, 'docs/zh-CN/guide/new.md'), 'utf8')
    ).toMatch(/lang: zh-CN[\s\S]*待翻译/)
    expect(await readFile(join(repo, 'docs/zh-CN/stale.md'), 'utf8')).toContain(
      'Stale'
    )
    expect(
      await readFile(
        join(repo, 'docs/.vitepress/crowdin/zh-CN/common.json'),
        'utf8'
      )
    ).toBe(JSON.stringify({ title: '标题' }))
    expect(await readdir(tempRoot)).toEqual([])
  })
  it.each(['tracked', 'untracked', 'staged'])(
    'refuses %s local changes before writing',
    async (kind) => {
      const file =
        kind === 'untracked'
          ? 'docs/zh-CN/local.md'
          : 'docs/zh-CN/component/button.md'
      await put(repo, file, 'Local change')
      if (kind === 'staged') git(repo, 'add', file)
      await expect(run()).rejects.toThrow(/未提交改动/)
      expect(await readFile(join(repo, file), 'utf8')).toBe('Local change')
      expect(await readdir(tempRoot)).toEqual([])
    }
  )
  it('cleans temporary files and preserves local pages after download failure', async () => {
    await expect(
      syncChineseDocs({
        repoRoot: repo,
        sourceUrl: join(root, 'missing'),
        tempRoot,
      })
    ).rejects.toThrow()
    expect(
      await readFile(join(repo, 'docs/zh-CN/component/button.md'), 'utf8')
    ).toContain('Old translation')
    expect(await readdir(tempRoot)).toEqual([])
  })
  it.each(['', page('Wrong language', 'en-US')])(
    'validates all downloaded pages before writing',
    async (content) => {
      await put(source, 'zh-CN/z-invalid.md', content)
      commit(source)
      await expect(run()).rejects.toThrow(/无效中文文档/)
      expect(
        await readFile(join(repo, 'docs/zh-CN/component/button.md'), 'utf8')
      ).toContain('Old translation')
      expect(await readdir(tempRoot)).toEqual([])
    }
  )
  it('reports empty container and value type differences in interface JSON', async () => {
    await put(
      repo,
      'docs/.vitepress/crowdin/en-US/common.json',
      JSON.stringify({ items: [], label: 'text', group: {} })
    )
    await put(
      repo,
      'docs/.vitepress/crowdin/zh-CN/common.json',
      JSON.stringify({ items: {}, label: 1 })
    )
    const result = await run()
    expect(result.jsonDifferences).toContain('common.json: missing items')
    expect(result.jsonDifferences).toContain('common.json: missing group')
    expect(result.jsonDifferences).toContain('common.json: missing label')
  })
  it('accepts UTF-8 BOM used by official translated Markdown', async () => {
    await put(source, 'zh-CN/component/button.md', `\uFEFF${page('按钮')}`)
    commit(source)
    await expect(run()).resolves.toMatchObject({ updated: 1 })
  })
  it('rejects downloaded symbolic links', async () => {
    await symlink('component/button.md', join(source, 'zh-CN/link.md'))
    commit(source)
    await expect(run()).rejects.toThrow(/符号链接/)
    expect(await readdir(tempRoot)).toEqual([])
  })
  it('rejects an empty translation directory', async () => {
    await rm(join(source, 'zh-CN'), { recursive: true })
    await put(source, 'README.md', '# Empty')
    commit(source)
    await expect(run()).rejects.toThrow()
    expect(await readdir(tempRoot)).toEqual([])
  })
  it('reports an upstream removal even when the English page remains', async () => {
    await rm(join(source, 'zh-CN/component/button.md'))
    await put(source, 'zh-CN/guide/retained.md', page('Retained'))
    commit(source)
    const result = await run()
    expect(result.stale).toContain('component/button.md')
    expect(
      await readFile(join(repo, 'docs/zh-CN/component/button.md'), 'utf8')
    ).toContain('Old translation')
  })
  it('refreshes generated English fallbacks after the English source changes', async () => {
    await run()
    commit(repo)
    await put(
      repo,
      'docs/en-US/guide/new.md',
      page('Updated English guide', 'en-US')
    )
    const result = await run()
    expect(result.fallback).toContain('guide/new.md')
    expect(result.updated).toBe(1)
    expect(
      await readFile(join(repo, 'docs/zh-CN/guide/new.md'), 'utf8')
    ).toContain('Updated English guide')
  })
  it('leaves identical tracked translations untouched', async () => {
    await put(repo, 'docs/zh-CN/component/button.md', page('按钮'))
    await put(repo, 'docs/zh-CN/guide/new.md', page('Translated guide'))
    commit(repo)
    const result = await run()
    expect(result.updated).toBe(0)
    expect(result.added).toBe(0)
    expect(
      await readFile(join(repo, 'docs/zh-CN/guide/new.md'), 'utf8')
    ).toContain('Translated guide')
  })
})
