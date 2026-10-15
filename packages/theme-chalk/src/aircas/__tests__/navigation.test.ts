import { resolve } from 'node:path'
import { compileString } from 'sass-embedded'
import { afterEach, beforeAll, describe, expect, it } from 'vitest'

const components = [
  'menu',
  'tree',
  'tabs',
  'breadcrumb',
  'pagination',
  'tag',
  'anchor',
  'link',
]
let rules: CSSStyleRule[]
let componentRules: CSSStyleRule[]
const initialDark = document.documentElement.classList.contains('dark')
afterEach(() => document.documentElement.classList.toggle('dark', initialDark))

const parse = (css: string) => {
  const style = document.createElement('style')
  style.textContent = css
  document.head.append(style)
  const result = Array.from(style.sheet!.cssRules) as CSSStyleRule[]
  style.remove()
  return result
}

beforeAll(() => {
  const directory = resolve('packages/theme-chalk/src/aircas')
  const imports = components
    .map((name) => `@use 'components/${name}';`)
    .join('\n')
  const options = { loadPaths: [directory] }
  rules = parse(compileString("@use 'index';", options).css)
  componentRules = parse(compileString(imports, options).css)
})

const value = (selector: string, property: string) =>
  rules
    .filter((rule) =>
      rule.selectorText
        ?.split(',')
        .map((part) => part.trim())
        .includes(selector)
    )
    .map((rule) => rule.style.getPropertyValue(property).trim())
    .reduce<string | undefined>((previous, next) => next || previous, undefined)

describe('AirCAS dark navigation colors', () => {
  it('uses accent interactions and designed surfaces for menus and trees', () => {
    expect(value(':root.dark .el-menu', '--el-menu-text-color')).toBe(
      'var(--el-text-color-regular)'
    )
    expect(value(':root.dark .el-menu', '--el-menu-active-color')).toBe(
      '#00c4e5'
    )
    expect(value(':root.dark .el-menu', '--el-menu-hover-bg-color')).toBe(
      '#062b47'
    )
    expect(
      value(
        ':root.dark .el-menu-item.is-active:not(.is-disabled)',
        'background-color'
      )
    ).toBe('#093d7e')
    expect(
      value(':root.dark .el-menu-item.is-active:not(.is-disabled)', 'color')
    ).toBe('var(--el-text-color-primary)')
    expect(value(':root.dark .el-tree', 'background-color')).toBe('transparent')
    expect(value(':root.dark .el-tree', '--el-tree-node-hover-bg-color')).toBe(
      '#0a2b47'
    )
    expect(value(':root.dark .el-tree', '--el-tree-expand-icon-color')).toBe(
      '#90abc1'
    )
    expect(
      value(
        ':root.dark .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content',
        'background-color'
      )
    ).toBe('#093d7e')
  })

  it('keeps disabled tabs out of accent and card selection rules', () => {
    expect(
      value(':root.dark .el-tabs__item.is-active:not(.is-disabled)', 'color')
    ).toBe('#00c4e5')
    for (const variant of ['card', 'border-card']) {
      expect(
        value(
          `:root.dark .el-tabs--${variant} > .el-tabs__header .el-tabs__item.is-active:not(.is-disabled)`,
          'background-color'
        )
      ).toBe('#093d7e')
      expect(
        value(
          `:root.dark .el-tabs--${variant} > .el-tabs__header .el-tabs__item.is-active:not(.is-disabled)`,
          'color'
        )
      ).toBe('var(--el-text-color-primary)')
    }
    expect(
      value(
        ':root.dark .el-tabs--border-card > .el-tabs__header',
        'background-color'
      )
    ).toBe('#042551')
    expect(
      componentRules.some((rule) => rule.selectorText.includes('active-bar'))
    ).toBe(false)
    expect(
      componentRules.some((rule) => rule.selectorText.includes('new-tab'))
    ).toBe(false)
    const fixture = document.createElement('div')
    fixture.innerHTML =
      '<div class="el-tabs el-tabs--border-card"><div class="el-tabs__header"><div class="el-tabs__item is-active is-disabled"></div></div></div>'
    document.documentElement.classList.add('dark')
    document.body.append(fixture)
    const item = fixture.querySelector('.el-tabs__item')!
    expect(
      componentRules.filter(
        (rule) =>
          item.matches(rule.selectorText) &&
          rule.style.getPropertyValue('color')
      )
    ).toEqual([])
    fixture.remove()
    document.documentElement.classList.remove('dark')
  })

  it('uses native pagination and anchor variables without new borders', () => {
    expect(
      value(':root.dark .el-pagination', '--el-pagination-button-color')
    ).toBe('var(--el-text-color-regular)')
    expect(
      value(':root.dark .el-pagination', '--el-pagination-hover-color')
    ).toBe('#00c4e5')
    expect(
      value(':root.dark .el-pagination', '--el-pagination-button-bg-color')
    ).toBe('var(--el-bg-color)')
    expect(value(':root.dark .el-anchor', '--el-anchor-active-color')).toBe(
      '#00c4e5'
    )
    expect(value(':root.dark .el-anchor', '--el-anchor-bg-color')).toBe(
      'transparent'
    )
  })

  it.each(['light', 'plain', 'dark'])(
    'uses deep blue and accent primary tags for %s effect',
    (effect) => {
      const selector = `:root.dark .el-tag.el-tag--primary.el-tag--${effect}`
      expect(value(selector, '--el-tag-bg-color')).toBe('#08304a')
      expect(value(selector, '--el-tag-border-color')).toBe('#135470')
      expect(value(selector, '--el-tag-text-color')).toBe('#00c4e5')
    }
  )

  it('uses accent link colors without replacing disabled colors', () => {
    expect(value(':root.dark .el-breadcrumb__inner.is-link', 'color')).toBe(
      'var(--el-text-color-regular)'
    )
    expect(value(':root.dark .el-breadcrumb__inner a', 'color')).toBe(
      'var(--el-text-color-regular)'
    )
    expect(
      value(':root.dark .el-link.el-link--primary', '--el-link-text-color')
    ).toBe('#00c4e5')
    expect(
      value(
        ':root.dark .el-link.el-link--primary',
        '--el-link-hover-text-color'
      )
    ).toBe('#75e4f5')
    expect(
      value(
        ':root.dark .el-link.el-link--primary',
        '--el-link-disabled-text-color'
      )
    ).toBeUndefined()
    const link = document.createElement('a')
    link.className = 'el-link el-link--success'
    document.documentElement.classList.add('dark')
    document.body.append(link)
    expect(
      componentRules.filter((rule) => link.matches(rule.selectorText))
    ).toEqual([])
    link.remove()
    expect(
      value(
        ':root.dark .el-breadcrumb__item:not(:last-child) .el-breadcrumb__inner.is-link:hover',
        'color'
      )
    ).toBe('#00c4e5')
  })

  it('limits component additions to dark colors and leaves light and geometry untouched', () => {
    expect(componentRules.length).toBeGreaterThan(0)
    for (const rule of componentRules) {
      expect(
        rule.selectorText
          .split(',')
          .every((part) => part.trim().startsWith(':root.dark '))
      ).toBe(true)
      for (let index = 0; index < rule.style.length; index++) {
        const property = rule.style[index]
        expect(property).toMatch(
          /^(?:--el-[\w-]*color|color|background-color|border(?:-[\w]+)?-color)$/
        )
        expect(rule.style.getPropertyPriority(property)).toBe('')
      }
    }
  })
})
