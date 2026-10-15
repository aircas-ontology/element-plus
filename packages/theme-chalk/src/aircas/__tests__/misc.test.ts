import { resolve } from 'node:path'
import { TinyColor } from '@ctrl/tinycolor'
import { compile } from 'sass-embedded'
import { afterEach, beforeAll, describe, expect, it } from 'vitest'

let rules: CSSStyleRule[]
const initialDark = document.documentElement.classList.contains('dark')

beforeAll(() => {
  const style = document.createElement('style')
  style.textContent = compile(
    resolve('packages/theme-chalk/src/aircas/index.scss')
  ).css
  document.head.append(style)
  rules = Array.from(style.sheet!.cssRules) as CSSStyleRule[]
  style.remove()
})

afterEach(() => document.documentElement.classList.toggle('dark', initialDark))

const localDeclarations = (html: string, dark = true) => {
  document.documentElement.classList.toggle('dark', dark)
  const fixture = document.createElement('div')
  fixture.innerHTML = html
  document.body.append(fixture)
  const element =
    fixture.querySelector('[data-target]') || fixture.lastElementChild!
  const declarations = Object.fromEntries(
    rules
      .filter((rule) =>
        element.matches(rule.selectorText.replaceAll(':hover', '.test-hover'))
      )
      .flatMap((rule) =>
        Array.from({ length: rule.style.length }, (_, index) => {
          const name = rule.style[index]
          return [name, rule.style.getPropertyValue(name).trim()]
        })
      )
  )
  fixture.remove()
  return declarations
}

describe('AirCAS supporting dark component colors', () => {
  it.each([
    ['el-progress-bar__outer', 'background-color', '#11314a'],
    ['el-avatar', '--el-avatar-bg-color', 'var(--el-color-primary)'],
    ['el-avatar', '--el-avatar-text-color', 'var(--el-text-color-primary)'],
    ['el-calendar', '--el-calendar-selected-bg-color', '#093d7e'],
    ['el-collapse', '--el-collapse-header-bg-color', 'transparent'],
    ['el-collapse', '--el-collapse-content-bg-color', 'transparent'],
    [
      'el-collapse',
      '--el-collapse-content-text-color',
      'var(--el-text-color-secondary)',
    ],
    ['el-step__head is-process', 'color', '#00c4e5'],
    ['el-step__title is-process', 'color', '#00c4e5'],
    ['el-step__head is-wait', 'color', '#688198'],
    ['el-step__head is-wait', 'border-color', '#42617d'],
    ['el-steps el-steps--simple', 'background-color', '#042551'],
    ['el-transfer', '--el-transfer-panel-header-bg-color', '#0e5c78'],
    ['el-upload__tip', 'color', 'var(--el-text-color-secondary)'],
    ['el-skeleton', '--el-skeleton-color', '#0a2841'],
    ['el-skeleton', '--el-skeleton-to-color', '#123d56'],
    ['el-loading-mask', '--el-mask-color', '#000e24d1'],
    ['el-tour', '--el-tour-bg-color', 'var(--el-bg-color-overlay)'],
    ['el-backtop', '--el-backtop-bg-color', '#042551'],
    ['el-backtop', '--el-backtop-text-color', '#00c4e5'],
    ['el-scrollbar', '--el-scrollbar-bg-color', '#285673'],
    ['el-timeline-item__tail', 'border-left-color', '#23465b'],
  ])('corrects %s %s', (className, property, value) => {
    const actual = localDeclarations(`<div class="${className}"></div>`)[
      property
    ]
    if (value.startsWith('#')) {
      expect(actual).toBeDefined()
      expect(new TinyColor(actual).toHex8String()).toBe(
        new TinyColor(value).toHex8String()
      )
    } else {
      expect(actual).toBe(value)
    }
    expect(
      localDeclarations(`<div class="${className}"></div>`, false)[property]
    ).toBeUndefined()
  })

  it('keeps the primary Tour effect and disabled Collapse header untouched', () => {
    expect(
      localDeclarations('<div class="el-tour el-tour--primary"></div>')[
        '--el-tour-bg-color'
      ]
    ).toBeUndefined()
    expect(
      localDeclarations(
        '<div class="el-collapse-item is-disabled"><button data-target class="el-collapse-item__header is-active"></button></div>'
      ).color
    ).toBeUndefined()
  })

  it('changes only the enabled Upload dragger border during hover', () => {
    const fixture = (disabled: boolean) =>
      `<div class="el-upload${disabled ? ' is-disabled' : ''}"><div data-target class="el-upload-dragger test-hover"></div></div>`
    expect(localDeclarations(fixture(false))['border-color']).toBe('#00c4e5')
    expect(localDeclarations(fixture(true))['border-color']).toBeUndefined()
  })

  it('keeps Calendar hover independent from the selected background', () => {
    expect(
      localDeclarations(
        '<table class="el-calendar-table"><tbody><tr><td class="is-selected"><div data-target class="el-calendar-day test-hover"></div></td></tr></tbody></table>'
      )['background-color']
    ).toBe('#0b2f4a')
  })

  it('colors an active enabled Collapse header', () => {
    expect(
      localDeclarations(
        '<div class="el-collapse-item"><button data-target class="el-collapse-item__header is-active"></button></div>'
      ).color
    ).toBe('#00c4e5')
  })

  it('colors the Loading indicator without recoloring nested components', () => {
    expect(
      localDeclarations(
        '<div class="el-loading-spinner"><div data-target class="path"></div></div>'
      ).stroke
    ).toBe('#00c4e5')
    expect(
      localDeclarations(
        '<div class="el-loading-spinner"><p data-target class="el-loading-text"></p></div>'
      ).color
    ).toBe('#00c4e5')
    expect(
      localDeclarations('<div class="el-loading-mask"></div>')[
        '--el-color-primary'
      ]
    ).toBeUndefined()
  })
})
