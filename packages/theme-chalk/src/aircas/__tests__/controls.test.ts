import { resolve } from 'node:path'
import { compile } from 'sass-embedded'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

let rules: CSSStyleRule[]
const initiallyDark = document.documentElement.classList.contains('dark')
beforeAll(() => {
  const style = document.createElement('style')
  style.textContent = compile(
    resolve('packages/theme-chalk/src/aircas/index.scss')
  ).css
  document.head.append(style)
  rules = Array.from(style.sheet!.cssRules) as CSSStyleRule[]
  style.remove()
  document.documentElement.classList.add('dark')
})
afterAll(() => document.documentElement.classList.toggle('dark', initiallyDark))

const themeStyle = (html: string, target: string) => {
  const fixture = document.createElement('div')
  fixture.innerHTML = html
  document.body.append(fixture)
  const element = fixture.querySelector(target)!
  const variables: Record<string, string> = {}
  for (const node of [
    document.documentElement,
    ...Array.from(fixture.querySelectorAll('*')).filter(
      (node) => node === element || node.contains(element)
    ),
  ]) {
    for (const rule of rules.filter(
      (rule) =>
        !rule.selectorText.includes('::') && node.matches(rule.selectorText)
    )) {
      for (let index = 0; index < rule.style.length; index++) {
        const property = rule.style[index]
        if (node === element || property.startsWith('--'))
          variables[property] = rule.style.getPropertyValue(property).trim()
      }
    }
  }
  fixture.remove()
  const resolveValue = (value: string): string =>
    value.replace(/var\((--[\w-]+)\)/g, (_, name: string) =>
      resolveValue(variables[name] ?? `UNDEFINED:${name}`)
    )
  return (name: string) => resolveValue(variables[name] ?? '')
}

describe('AirCAS dark control colors', () => {
  it.each([
    [
      '<div class="el-select"><div class="el-select__wrapper is-focused"></div></div>',
      '.el-select__wrapper',
      'box-shadow',
      '0 0 0 1px #00c4e5 inset',
    ],
    [
      '<div class="el-select-dropdown"><div class="el-select-dropdown__item is-selected"></div></div>',
      '.el-select-dropdown__item',
      'background-color',
      '#093d7e',
    ],
    [
      '<div class="el-select-dropdown"><div class="el-select-dropdown__item is-hovering"></div></div>',
      '.el-select-dropdown__item',
      'background-color',
      '#10395b',
    ],
    [
      '<div class="el-select-dropdown"><div class="el-select-dropdown__item is-selected is-disabled"></div></div>',
      '.el-select-dropdown__item',
      'background-color',
      '',
    ],
    [
      '<div class="el-segmented"></div>',
      '.el-segmented',
      '--el-segmented-bg-color',
      '#00122c',
    ],
    [
      '<div class="el-segmented"></div>',
      '.el-segmented',
      '--el-segmented-item-selected-bg-color',
      '#093d7e',
    ],
    [
      '<label class="el-checkbox"></label>',
      '.el-checkbox',
      '--el-checkbox-checked-text-color',
      '#c4d1de',
    ],
    [
      '<label class="el-checkbox"></label>',
      '.el-checkbox',
      '--el-checkbox-checked-input-border-color',
      '#00c4e5',
    ],
    [
      '<label class="el-radio-button"></label>',
      '.el-radio-button',
      '--el-radio-button-checked-bg-color',
      '#093d7e',
    ],
    [
      '<label class="el-radio-button"></label>',
      '.el-radio-button',
      '--el-radio-button-checked-text-color',
      '#e1eaf3',
    ],
    [
      '<div class="el-date-editor el-input"></div>',
      '.el-date-editor',
      '--el-input-focus-border-color',
      '#00c4e5',
    ],
    [
      '<table class="el-date-table"></table>',
      '.el-date-table',
      '--el-datepicker-inrange-bg-color',
      '#093855',
    ],
    [
      '<div class="el-form-item is-error"><div class="el-select"><div class="el-select__wrapper is-focused"></div></div></div>',
      '.el-select__wrapper',
      'box-shadow',
      '0 0 0 1px #eb5058 inset',
    ],
    [
      '<div class="el-input"></div>',
      '.el-input',
      '--el-input-focus-border-color',
      '#00c4e5',
    ],
    [
      '<div class="el-textarea"></div>',
      '.el-textarea',
      '--el-input-focus-border-color',
      '#00c4e5',
    ],
    [
      '<div class="el-input-tag is-focused"></div>',
      '.el-input-tag',
      'box-shadow',
      '0 0 0 1px #00c4e5 inset',
    ],
    [
      '<label class="el-radio"></label>',
      '.el-radio',
      '--el-radio-input-border-color-hover',
      '#00c4e5',
    ],
    [
      '<div class="el-switch"></div>',
      '.el-switch',
      '--el-switch-on-color',
      '#13bf7d',
    ],
    [
      '<div class="el-slider"></div>',
      '.el-slider',
      '--el-slider-runway-bg-color',
      '#12314c',
    ],
    [
      '<button class="el-button"></button>',
      '.el-button',
      '--el-button-bg-color',
      '#042551',
    ],
    [
      '<button class="el-button el-button--small"></button>',
      '.el-button',
      '--el-button-bg-color',
      '#042551',
    ],
    [
      '<button class="el-button el-button--large"></button>',
      '.el-button',
      '--el-button-bg-color',
      '#042551',
    ],
    [
      '<button class="el-button el-button--primary is-text"></button>',
      '.el-button',
      '--el-button-text-color',
      '#00c4e5',
    ],
  ])('applies %s %s %s', (html, target, property, expected) => {
    expect(themeStyle(html, target)(property)).toBe(expected)
  })
})
