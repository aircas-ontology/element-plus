import { resolve } from 'node:path'
import { TinyColor } from '@ctrl/tinycolor'
import { compile } from 'sass-embedded'
import { afterEach, beforeAll, describe, expect, it } from 'vitest'

let rules: CSSStyleRule[]
let loadedSources: string[]
let officialDefinitions: Set<string>
const initialDark = document.documentElement.classList.contains('dark')
afterEach(() => document.documentElement.classList.toggle('dark', initialDark))

beforeAll(() => {
  const { css, loadedUrls } = compile(
    resolve('packages/theme-chalk/src/aircas/index.scss')
  )
  loadedSources = loadedUrls.map((url) => url.pathname)
  const style = document.createElement('style')
  style.textContent = css
  document.head.append(style)
  rules = Array.from(style.sheet!.cssRules) as CSSStyleRule[]
  style.remove()
  const officialCSS = ['index.scss', 'dark/css-vars.scss']
    .map((entry) => compile(resolve('packages/theme-chalk/src', entry)).css)
    .join('\n')
  officialDefinitions = new Set(
    Array.from(officialCSS.matchAll(/(--[\w-]+)\s*:/g), ([, name]) => name)
  )
})

const declarations = (rule: CSSStyleRule) =>
  Array.from({ length: rule.style.length }, (_, index) => {
    const property = rule.style[index]
    return [property, rule.style.getPropertyValue(property).trim()] as const
  })
const rootVariables = (dark: boolean) => {
  document.documentElement.classList.toggle('dark', dark)
  return Object.fromEntries(
    rules
      .filter((rule) => document.documentElement.matches(rule.selectorText))
      .flatMap(declarations)
  )
}
const resolveVariable = (
  variables: Record<string, string>,
  name: string
): string => {
  const value = variables[name]
  if (!value) throw new Error(`Undefined theme variable: ${name}`)
  return value.replace(/var\(\s*(--[\w-]+)\s*\)/g, (_, reference: string) =>
    resolveVariable(variables, reference)
  )
}

describe('AirCAS compiled theme', () => {
  it('compiles independently of the disposable design reference directory', () => {
    expect(loadedSources.length).toBeGreaterThan(0)
    expect(
      loadedSources.every((source) =>
        source.startsWith(`${resolve('packages/theme-chalk/src/aircas')}/`)
      )
    ).toBe(true)
  })

  it('uses native Element Plus colors without a parallel AirCAS color layer', () => {
    const entries = rules.flatMap(declarations)
    const legacyColors = entries.filter(([name, value]) =>
      `${name} ${value}`.includes('--aircas-color-')
    )
    expect(
      legacyColors.length,
      'Legacy AirCAS color declarations and references must be removed'
    ).toBe(0)
  })

  it('only emits and references color variable names present in official CSS', () => {
    const colorNames = rules
      .flatMap(declarations)
      .flatMap(([name, value]) =>
        [
          name,
          ...Array.from(
            value.matchAll(/var\(\s*(--el-[\w-]+)/g),
            ([, reference]) => reference
          ),
        ].filter((candidate) => /^--el-.*color(?:-|$)/.test(candidate))
      )
    const unknown = [...new Set(colorNames)].filter(
      (name) => !officialDefinitions.has(name)
    )
    expect(unknown).toEqual([])
  })

  it('uses the interaction cyan globally with navy surfaces and designed statuses', () => {
    const dark = rootVariables(true)
    const expected = {
      '--el-color-primary': '#00c4e5',
      '--el-color-success': '#21d36a',
      '--el-color-warning': '#e2c626',
      '--el-color-danger': '#eb5058',
      '--el-bg-color-page': '#000e24',
      '--el-bg-color': '#00122c',
      '--el-text-color-primary': '#e1eaf3',
      '--el-text-color-regular': '#c4d1de',
      '--el-text-color-secondary': '#8b9fb5',
      '--el-border-color': '#073052',
    }
    for (const [name, value] of Object.entries(expected))
      expect(resolveVariable(dark, name), name).toBe(value)
    expect(resolveVariable(dark, '--el-color-primary-rgb')).toMatch(
      /^0,\s*196,\s*229$/
    )
  })

  it('derives primary states from cyan and keeps explicit status ramps and aliases', () => {
    const dark = rootVariables(true)
    const primaryHover = resolveVariable(dark, '--el-color-primary-light-3')
    // Native dark-mode light-3 mixes 70% primary with 30% background.
    if (primaryHover.startsWith('color-mix(')) {
      const expression = primaryHover.replace(/\s+/g, '')
      expect(expression).toContain('#00c4e570%')
      expect(expression).toContain('#00122c')
    } else {
      expect(new TinyColor(primaryHover).toHexString()).toBe('#008fae')
    }
    expect(resolveVariable(dark, '--el-color-success-light-3')).toBe('#279259')
    expect(resolveVariable(dark, '--el-color-warning-light-3')).toBe('#a7982d')
    expect(resolveVariable(dark, '--el-color-danger-light-3')).toBe('#b84450')
    for (const suffix of [
      '',
      '-rgb',
      '-light-3',
      '-light-5',
      '-light-7',
      '-light-8',
      '-light-9',
      '-dark-2',
    ]) {
      expect(resolveVariable(dark, `--el-color-error${suffix}`)).toBe(
        resolveVariable(dark, `--el-color-danger${suffix}`)
      )
    }
  })

  it('keeps the muted primary fill local to solid buttons', () => {
    const dark = rootVariables(true)
    const button = document.createElement('button')
    button.className = 'el-button el-button--primary'
    document.body.append(button)
    const matchingValues = () =>
      rules
        .filter((rule) => button.matches(rule.selectorText))
        .flatMap(declarations)
        .filter(([name]) => name === '--el-button-bg-color')
        .map(([, value]) =>
          value.replace(/var\(\s*(--[\w-]+)\s*\)/g, (_, name: string) =>
            resolveVariable(dark, name)
          )
        )
    expect(matchingValues()).toContain('#126681')
    button.classList.add('is-link')
    expect(matchingValues()).not.toContain('#126681')
    button.remove()
  })

  it('retains light visual colors and shared typography, sizing and radii', () => {
    const light = rootVariables(false)
    const expected = {
      '--el-color-primary': '#0758b8',
      '--el-color-success': '#15803d',
      '--el-color-warning': '#b45309',
      '--el-color-danger': '#dc2626',
      '--el-bg-color-page': '#f3f8fc',
      '--el-bg-color': '#ffffff',
      '--el-text-color-primary': '#10243a',
      '--el-border-color': '#afc4d4',
      '--el-component-size': '30px',
      '--aircas-size-button': '32px',
      '--el-font-size-base': '14px',
      '--el-border-radius-base': '6px',
    }
    for (const [name, value] of Object.entries(expected))
      expect(resolveVariable(light, name), name).toBe(value)
    const dark = rootVariables(true)
    for (const [name, value] of Object.entries(light)) {
      if (/^--aircas-(font|size|space|radius)-/.test(name))
        expect(dark[name], name).toBe(value)
    }
  })

  it.each([
    '<div class="el-input"><div class="el-input__wrapper"></div></div>',
    '<div class="el-textarea"></div>',
    '<div class="el-select"><div class="el-select__wrapper"></div></div>',
    '<a class="el-link el-link--primary"></a>',
    '<label class="el-checkbox is-checked"><span class="el-checkbox__input is-checked"></span><span class="el-checkbox__inner"></span></label>',
    '<label class="el-radio is-checked"><span class="el-radio__input is-checked"></span><span class="el-radio__inner"></span></label>',
    '<ul class="el-menu"><li class="el-menu-item is-active"></li></ul>',
    '<div class="el-tabs"><div class="el-tabs__item is-active"></div><div class="el-tabs__active-bar"></div></div>',
    '<div class="el-loading-mask"><div class="el-loading-spinner"></div></div>',
  ])('lets official component colors inherit root tokens for %s', (html) => {
    rootVariables(true)
    const fixture = document.createElement('div')
    fixture.innerHTML = html
    document.body.append(fixture)
    const elements = Array.from(fixture.querySelectorAll('*'))
    const localColorDeclarations = rules
      .filter((rule) =>
        elements.some((element) => element.matches(rule.selectorText))
      )
      .flatMap(declarations)
      .filter(([name]) => !['--el-input-height', 'min-height'].includes(name))
    fixture.remove()
    expect(localColorDeclarations).toEqual([])
  })

  it.each([false, true])(
    'resolves theme references with official CSS in dark=%s',
    (dark) => {
      const applicable = rules.filter(({ selectorText }) =>
        dark
          ? !selectorText.includes(':not(.dark)') ||
            selectorText.includes(':root.dark')
          : !selectorText.includes(':root.dark') ||
            selectorText.includes(':not(.dark)')
      )
      const entries = applicable.flatMap(declarations)
      const defined = new Set([
        ...officialDefinitions,
        ...entries.map(([name]) => name),
      ])
      const missing = entries.flatMap(([name, value]) =>
        Array.from(value.matchAll(/var\(\s*(--[\w-]+)/g), ([, reference]) =>
          defined.has(reference) ? [] : [`${name}: ${reference}`]
        ).flat()
      )
      expect([...new Set(missing)]).toEqual([])
    }
  )
})
