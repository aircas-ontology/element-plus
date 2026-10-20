// @vitest-environment node
import path from 'node:path'
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'
import { compile, compileString } from 'sass-embedded'
import puppeteer from 'puppeteer'

import type { Browser, Page } from 'puppeteer'

const themeDir = fileURLToPath(new URL('../..', import.meta.url))
const aircas = compile(path.join(themeDir, 'aircas/index.scss')).css
const css = compileString(
  '@use "index.scss" as official; @use "dark/css-vars.scss"; @use "aircas/index.scss" as aircas;',
  { loadPaths: [themeDir], logger: { warn() {}, debug() {} } }
).css
const lightBaseline = compileString(
  '@use "index.scss" as official; @use "aircas/themes/light.scss"; @use "aircas/variables.scss";',
  { loadPaths: [themeDir], logger: { warn() {}, debug() {} } }
).css
let browser: Browser
let page: Page

const rgb = (hex: string) =>
  `rgb(${[1, 3, 5].map((i) => Number.parseInt(hex.slice(i, i + 2), 16)).join(', ')})`

async function style(selector: string, property: string, pseudo?: string) {
  return page.$eval(
    selector,
    (el, { property, pseudo }) =>
      getComputedStyle(el, pseudo).getPropertyValue(property).trim(),
    { property, pseudo }
  )
}

async function paletteColor(name: string) {
  return page.evaluate((variable) => {
    const probe = document.createElement('i')
    probe.style.color = `var(--el-${variable})`
    document.body.append(probe)
    const color = getComputedStyle(probe).color
    probe.remove()
    return color
  }, name)
}

async function render(html: string, dark = true) {
  await page.setContent(
    `<html class="${dark ? 'dark' : ''}"><head><style>${css}</style></head><body>${html}</body></html>`
  )
}

// WCAG relative luminance, using the opaque colors returned by the browser.
function contrast(foreground: string, background: string) {
  const luminance = (color: string) => {
    const channels = color
      .match(/[\d.]+/g)!
      .slice(0, 3)
      .map(Number)
      .map((value) => {
        const channel = value / 255
        return channel <= 0.04045
          ? channel / 12.92
          : ((channel + 0.055) / 1.055) ** 2.4
      })
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722
  }
  const values = [luminance(foreground), luminance(background)].sort(
    (a, b) => b - a
  )
  return (values[0] + 0.05) / (values[1] + 0.05)
}

async function renderStates(html: string) {
  await render(html)
  await page.addStyleTag({
    content: '*, *::before, *::after { transition-duration: 0s !important; }',
  })
}

async function focus(selector: string) {
  await page.keyboard.press('Tab')
  await page.focus(selector)
}

beforeAll(async () => {
  browser = await puppeteer.launch({ headless: true })
}, 30000)
beforeEach(async () => {
  page = await browser.newPage()
  await page.setViewport({ width: 1000, height: 900 })
})
afterEach(async () => {
  await page?.close()
})
afterAll(async () => {
  await browser?.close()
})

describe('Aircas palette', () => {
  it('contains only the 31 approved fixed dark colors', () => {
    const dir = path.join(themeDir, 'aircas')
    const dark = readFileSync(
      path.join(dir, 'common/_color.scss'),
      'utf8'
    ).split('$dark: (')[1]
    const special = readFileSync(
      path.join(dir, 'common/_color-special.scss'),
      'utf8'
    )
    const approved = [
      '126681',
      '21d36a',
      'e2c626',
      'eb5058',
      '9cacbf',
      '0e5c78',
      '197f9e',
      '00c4e5',
      '093d7e',
      '000e24',
      '00122c',
      '001630',
      '092741',
      '0a2d48',
      '2187a8',
      '124769',
      '073052',
      'e1eaf3',
      'c4d1de',
      '8b9fb5',
      '7890a8',
      '596f86',
      'ffffff',
      '000000',
      '2b3e52',
      '526170',
      '9aa7b5',
      '000714cc',
      '000714b8',
      '00071480',
      '00071466',
    ]
    expect(new Set((dark + special).match(/#[\da-f]{6,8}\b/gi))).toEqual(
      new Set(approved.map((color) => `#${color}`))
    )
    for (const name of readdirSync(path.join(dir, 'components'))) {
      expect(
        readFileSync(path.join(dir, 'components', name), 'utf8')
      ).not.toMatch(/#[\da-f]{6,8}\b/i)
    }
  })
  it('emits the approved dark border, hover and selection colors', async () => {
    await render('')
    for (const [name, value] of Object.entries({
      'border-color': '#2187a8',
      'border-color-hover': '#00c4e5',
      'fill-color-light': '#0a2d48',
      'fill-color-darker': '#093d7e',
      'disabled-bg-color': '#092741',
    })) {
      expect(await style('html', `--el-${name}`)).toBe(value)
    }
  })

  it('generates the approved official dark ramps and danger aliases', async () => {
    await render('')
    const ramps = {
      primary: [
        '#0d4d68',
        '#093c57',
        '#052b46',
        '#04233d',
        '#021a35',
        '#41859a',
      ],
      success: [
        '#179957',
        '#11734b',
        '#0a4c3f',
        '#073938',
        '#032532',
        '#4ddc88',
      ],
      warning: [
        '#9e9028',
        '#716c29',
        '#44482a',
        '#2d362b',
        '#17242b',
        '#e8d151',
      ],
      danger: [
        '#a53d4b',
        '#763142',
        '#472539',
        '#2f1e35',
        '#181830',
        '#ef7379',
      ],
      info: ['#6d7e93', '#4e5f76', '#2f4058', '#1f3149', '#10213b', '#b0bdcc'],
    }
    const suffixes = [
      'light-3',
      'light-5',
      'light-7',
      'light-8',
      'light-9',
      'dark-2',
    ]
    for (const [type, colors] of Object.entries(ramps)) {
      for (const [index, suffix] of suffixes.entries()) {
        expect(await paletteColor(`color-${type}-${suffix}`)).toBe(
          rgb(colors[index])
        )
      }
    }
    for (const suffix of ['', '-rgb', ...suffixes.map((s) => `-${s}`)]) {
      expect(await style('html', `--el-color-error${suffix}`)).toBe(
        await style('html', `--el-color-danger${suffix}`)
      )
    }
    expect(await style('html', '--el-color-primary-rgb')).toMatch(
      /18,\s*102,\s*129/
    )
  })

  it('preserves the light palette and component protection rules', async () => {
    await render(
      '<div class="el-input"><div id="input" class="el-input__wrapper"></div></div>',
      false
    )
    for (const [name, value] of Object.entries({
      'color-primary': '#0758b8',
      'color-success': '#15803d',
      'color-warning': '#b45309',
      'color-danger': '#dc2626',
      'color-info': '#475569',
      'bg-color': '#ffffff',
      'bg-color-page': '#f3f8fc',
      'fill-color-light': '#e5f3ff',
      'border-color': '#afc4d4',
    })) {
      expect(await style('html', `--el-${name}`)).toBe(value)
    }
    expect(await style('#input', 'background-color')).toBe(rgb('#ffffff'))
    expect(await style('html', '--el-color-primary-light-3')).toContain(
      'color-mix('
    )
  })

  it('restores light colors when the html dark switch is removed', async () => {
    await render(
      '<button id="button" class="el-button el-button--success">Success</button>'
    )
    await page.evaluate(() => document.documentElement.classList.remove('dark'))
    await page.waitForFunction(
      () =>
        getComputedStyle(document.querySelector('#button')!).backgroundColor ===
        'rgb(21, 128, 61)'
    )
    expect(await style('#button', 'background-color')).toBe(rgb('#15803d'))
    await page.evaluate(() => document.documentElement.classList.add('dark'))
    await new Promise((resolve) => setTimeout(resolve, 150))
    expect(await style('#button', 'background-color')).toBe(rgb('#21d36a'))
    expect(aircas).not.toContain('--aircas-color-')
  })
})

describe('Aircas component states', () => {
  it('keeps the danger close icon outlined on an error dark alert', async () => {
    await render(
      `<div class="el-alert el-alert--error is-dark"><span class="el-alert__title">Error</span><i id="close" tabindex="0" class="el-icon el-alert__close-btn"><svg viewBox="0 0 1024 1024"><path d="M200 200 824 824 M824 200 200 824" stroke="currentColor" stroke-width="100"/></svg></i></div>`
    )
    await page.hover('#close')
    await new Promise((resolve) => setTimeout(resolve, 350))
    expect(await style('#close', 'color')).toBe(rgb('#eb5058'))
    expect(await style('#close', 'filter')).not.toBe('none')
    expect(await style('#close', 'background-color')).toBe('rgba(0, 0, 0, 0)')
  })

  it.each(['success', 'warning', 'info', 'error'])(
    '%s dark alert uses readable text on its bright semantic fill',
    async (type) => {
      await render(
        `<div class="el-alert el-alert--${type} is-dark"><span id="title" class="el-alert__title">Status</span><p id="description" class="el-alert__description">Details</p></div>`
      )
      expect(await style('#title', 'color')).toBe(rgb('#000000'))
      expect(await style('#description', 'color')).toBe(rgb('#000000'))
    }
  )

  it.each([
    ['primary', '#126681', '#197f9e', '#093d7e', '#ffffff'],
    ['success', '#21d36a', '#4ddc88', '#179957', '#000000'],
    ['warning', '#e2c626', '#e8d151', '#9e9028', '#000000'],
    ['danger', '#eb5058', '#ef7379', '#a53d4b', '#000000'],
    ['info', '#9cacbf', '#b0bdcc', '#6d7e93', '#000000'],
  ])(
    '%s solid button uses approved fills and readable text',
    async (type, base, hover, active, text) => {
      await render(
        `<button id="button" class="el-button el-button--${type}">${type}</button>`
      )
      expect(await style('#button', 'background-color')).toBe(rgb(base))
      expect(await style('#button', 'color')).toBe(rgb(text))
      await page.hover('#button')
      await new Promise((resolve) => setTimeout(resolve, 150))
      expect(await style('#button', 'background-color')).toBe(rgb(hover))
      await page.mouse.down()
      await new Promise((resolve) => setTimeout(resolve, 150))
      expect(await style('#button', 'background-color')).toBe(rgb(active))
      expect(await style('#button', 'color')).toBe(
        rgb(type === 'danger' ? '#ffffff' : text)
      )
      await page.mouse.up()
    }
  )

  it('keeps checkbox checked border and radio button selection distinct', async () => {
    await render(`<label class="el-checkbox"><span class="el-checkbox__input is-checked"><span id="checkbox" class="el-checkbox__inner"></span></span></label>
      <label class="el-radio-button is-active"><input class="el-radio-button__original-radio" type="radio" checked><span id="radio" class="el-radio-button__inner">Selected</span></label>`)
    expect(await style('#checkbox', 'border-color')).toBe(rgb('#00c4e5'))
    expect(await style('#checkbox', 'background-color')).toBe(rgb('#126681'))
    expect(await style('#radio', 'background-color')).toBe(rgb('#093d7e'))
  })

  it('shares hover fill across select, tree, cascader, time and table rows', async () => {
    await render(`<ul><li id="select" class="el-select-dropdown__item is-hovering">Option</li></ul>
      <div class="el-tree"><div class="el-tree-node"><div id="tree" class="el-tree-node__content">Node</div></div></div>
      <div class="el-cascader-panel"><div id="cascader" class="el-cascader-node">Choice</div></div>
      <ul class="el-time-spinner__list"><li id="time" class="el-time-spinner__item">12</li></ul>
      <div class="el-table el-table--enable-row-hover"><table class="el-table__body"><tbody><tr><td id="cell" class="el-table__cell">Cell</td></tr></tbody></table></div>`)
    expect(await style('#select', 'background-color')).toBe(rgb('#0a2d48'))
    for (const selector of ['#tree', '#cascader', '#time', '#cell']) {
      await page.hover(selector)
      expect(await style(selector, 'background-color')).toBe(rgb('#0a2d48'))
    }
  })

  it('preserves selected tree-select rows and suppresses disabled row hover', async () => {
    await render(`<div class="el-tree-select__popper"><div class="el-tree">
      <div class="el-tree-node"><div id="selected-node" class="el-tree-node__content"><span class="el-select-dropdown__item is-selected">Selected</span></div></div>
      <div class="el-tree-node" aria-disabled="true"><div id="disabled-node" class="el-tree-node__content"><span class="el-select-dropdown__item is-disabled">Disabled</span></div></div>
      </div></div>`)
    await page.hover('#selected-node')
    expect(await style('#selected-node', 'background-color')).toBe(
      rgb('#093d7e')
    )
    await page.hover('#disabled-node')
    expect(await style('#disabled-node', 'background-color')).toBe(
      'rgba(0, 0, 0, 0)'
    )
  })

  it.each(['', 'el-table--striped'])(
    'preserves the current table row through hover and fixed-column states %s',
    async (striped) => {
      await render(
        `<div class="el-table el-table--enable-row-hover ${striped}"><table class="el-table__body"><tbody><tr class="el-table__row el-table__row--striped current-row hover-row"><td id="cell" class="el-table__cell el-table-fixed-column--left hover-cell">Selected</td></tr></tbody></table></div>`
      )
      await page.hover('#cell')
      expect(await style('#cell', 'background-color')).toBe(rgb('#093d7e'))
    }
  )

  it('keeps selected options and multi-select ticks visible while disabled options stay inert', async () => {
    await render(`<ul class="el-select-dropdown is-multiple">
      <li id="selected" class="el-select-dropdown__item is-selected is-hovering">Selected</li>
      <li id="disabled" class="el-select-dropdown__item is-disabled is-hovering">Disabled</li></ul>`)
    expect(await style('#selected', 'background-color')).toBe(rgb('#093d7e'))
    expect(
      await page.$eval(
        '#selected',
        (el) => getComputedStyle(el, '::after').backgroundColor
      )
    ).toBe(rgb('#e1eaf3'))
    expect(await style('#disabled', 'background-color')).toBe(
      'rgba(0, 0, 0, 0)'
    )
  })

  it('preserves checked disabled controls and InputNumber bright disabled colors', async () => {
    await render(`<label class="el-checkbox is-disabled"><span class="el-checkbox__input is-checked is-disabled"><span id="checkbox" class="el-checkbox__inner"></span></span></label>
      <div class="el-input-number is-disabled"><div class="el-input is-disabled"><div id="number" class="el-input__wrapper"><input class="el-input__inner" disabled></div></div><span id="increase" class="el-input-number__increase is-disabled">+</span></div>`)
    expect(await style('#checkbox', 'background-color')).not.toBe(
      rgb('#126681')
    )
    expect(await style('#checkbox', 'border-color')).not.toBe(rgb('#00c4e5'))
    expect(await style('#number', 'background-color')).toBe(rgb('#2b3e52'))
    await page.hover('#increase')
    expect(await style('#increase', 'color')).toBe(rgb('#9aa7b5'))
  })

  it('keeps error borders visible over cyan focus and button focus visible from keyboard', async () => {
    await render(
      `<div class="el-form-item is-error"><div class="el-select__wrapper is-focused" id="error">Error</div></div><button id="button" class="el-button el-button--primary">Primary</button>`
    )
    expect(await style('#error', 'box-shadow')).toContain('rgb(235, 80, 88)')
    await page.keyboard.press('Tab')
    expect(await style('#button', 'outline-color')).toBe(rgb('#00c4e5'))
    expect(await style('#button', 'outline-style')).toBe('solid')
  })

  it.each(['date', 'month', 'year'])(
    '%s picker highlights available cells without hiding selection',
    async (type) => {
      await render(`<div class="el-picker-panel el-date-picker"><table class="el-${type}-table"><tbody><tr>
      <td class="available"><div class="el-date-table-cell"><span id="date" class="el-date-table-cell__text">12</span></div></td>
      <td class="available current"><div class="el-date-table-cell"><span id="selected" class="el-date-table-cell__text">13</span></div></td>
      </tr></tbody></table></div>`)
      await page.hover('#date')
      expect(await style('#date', 'background-color')).toBe(rgb('#0a2d48'))
      await page.hover('#selected')
      expect(await style('#selected', 'background-color')).toBe(rgb('#126681'))
    }
  )

  it.each([
    'dialog',
    'message-box',
    'drawer',
    'notification',
    'message',
    'alert',
    'tour',
  ])('%s close icon fades to danger on a transparent control', async (type) => {
    const names: Record<string, string> = {
      dialog: 'headerbtn',
      'message-box': 'headerbtn',
      drawer: 'close-btn',
      notification: 'closeBtn',
      message: 'closeBtn',
      alert: 'close-btn',
      tour: 'closebtn',
    }
    const standalone = ['notification', 'message', 'alert'].includes(type)
    const icon = type === 'drawer' ? 'el-icon' : `el-${type}__close`
    const control = standalone
      ? `<i tabindex="0" id="close" class="el-icon el-${type}__${names[type]}">×</i>`
      : `<button id="close" class="el-${type}__${names[type]}"><i id="icon" class="${icon}">×</i></button>`
    await render(
      `<div class="el-${type} ${type === 'tour' ? 'el-tour--primary' : ''}"><header id="header" class="el-${type}__header show-close"><span>Title</span>${control}</header></div>`
    )
    const iconSelector = standalone ? '#close' : '#icon'
    if (['dialog', 'message-box'].includes(type))
      expect(await style('#header', 'background-color')).toBe(rgb('#0e5c78'))
    expect(await style('#close', 'background-color')).toBe('rgba(0, 0, 0, 0)')
    expect(await style(iconSelector, 'color')).toBe(rgb('#e1eaf3'))
    expect(await style(iconSelector, 'transition-property')).toContain('color')
    await page.hover('#close')
    await new Promise((resolve) => setTimeout(resolve, 350))
    expect(await style(iconSelector, 'color')).toBe(rgb('#eb5058'))
    await page.mouse.move(0, 0)
    await page.keyboard.press('Tab')
    expect(await style('#close', 'outline-style')).toBe('solid')
    expect(await style('#close', 'outline-color')).toBe(rgb('#eb5058'))
  })
})

describe('Aircas contrast regressions', () => {
  it.each(['', 'range', 'vertical'])(
    'distinguishes %s slider tracks, handles, marks and focus',
    async (variant) => {
      const surface =
        variant === 'range'
          ? 'bg-color'
          : variant === 'vertical'
            ? 'bg-color-overlay'
            : 'bg-color-page'
      await renderStates(`<div id="surface" class="el-slider ${variant === 'vertical' ? 'is-vertical' : ''}" style="height:200px;background:var(--el-${surface})">
      <div id="runway" class="el-slider__runway"><div id="bar" class="el-slider__bar" style="${variant === 'vertical' ? 'height:50%' : 'width:50%'}"></div>
      <div id="handle" class="el-slider__button-wrapper" tabindex="0"><div id="thumb" class="el-slider__button"></div></div>
      ${variant === 'range' ? '<div class="el-slider__button-wrapper" style="left:80%" tabindex="0"><div id="second-thumb" class="el-slider__button"></div></div>' : ''}
      <div><div id="stop" class="el-slider__stop"></div><div id="mark" class="el-slider__stop el-slider__marks-stop"></div></div>
      <div class="el-slider__marks"><div id="mark-text" class="el-slider__marks-text">50%</div></div></div></div>`)
      const bar = await style('#bar', 'background-color')
      expect(bar).toBe(rgb('#00c4e5'))
      expect(
        contrast(bar, await style('#runway', 'background-color'))
      ).toBeGreaterThanOrEqual(3)
      expect(await style('#runway', 'outline-style')).toBe('solid')
      expect(
        contrast(
          await style('#runway', 'outline-color'),
          await style('#surface', 'background-color')
        )
      ).toBeGreaterThanOrEqual(3)
      expect(
        contrast(await style('#thumb', 'background-color'), bar)
      ).toBeGreaterThanOrEqual(3)
      expect(await style('#thumb', 'border-color')).toBe(bar)
      expect(
        contrast(
          await style('#stop', 'background-color'),
          await style('#runway', 'background-color')
        )
      ).toBeGreaterThanOrEqual(3)
      expect(
        contrast(await style('#mark', 'background-color'), bar)
      ).toBeGreaterThanOrEqual(3)
      expect(await style('#mark', 'box-shadow')).not.toBe('none')
      expect(
        contrast(
          await style('#mark-text', 'color'),
          await paletteColor('bg-color')
        )
      ).toBeGreaterThanOrEqual(4.5)
      if (variant === 'range')
        expect(await style('#second-thumb', 'background-color')).toBe(
          await style('#thumb', 'background-color')
        )
      await focus('#handle')
      expect(await style('#thumb', 'outline-style')).toBe('solid')
      expect(
        contrast(
          await style('#thumb', 'outline-color'),
          await style('#surface', 'background-color')
        )
      ).toBeGreaterThanOrEqual(3)
    }
  )

  it('preserves root slider color overrides', async () => {
    await renderStates(
      '<div class="el-slider" style="--el-slider-main-bg-color: #2187a8"><div class="el-slider__runway"><div id="bar" class="el-slider__bar"></div><div id="thumb" class="el-slider__button"></div></div></div>'
    )
    expect(await style('#bar', 'background-color')).toBe(rgb('#2187a8'))
    expect(await style('#thumb', 'border-color')).toBe(rgb('#2187a8'))
  })

  it('keeps disabled slider handles white when the runway is disabled', async () => {
    await renderStates(
      '<div class="el-slider"><div id="runway" class="el-slider__runway is-disabled"><div id="bar" class="el-slider__bar"></div><div class="el-slider__button-wrapper"><div id="thumb" class="el-slider__button"></div></div></div></div>'
    )
    expect(await style('#thumb', 'background-color')).toBe(rgb('#ffffff'))
    expect(await style('#thumb', 'border-color')).toBe(
      await style('#bar', 'background-color')
    )
    expect(await style('#thumb', 'border-color')).not.toBe(rgb('#00c4e5'))
    expect(await style('#runway', 'outline-style')).toBe('none')
  })

  it.each([false, true])(
    'shows the switch border and focus with a left label (checked %s)',
    async (checked) => {
      await renderStates(
        `<div class="el-switch ${checked ? 'is-checked' : ''}"><input id="input" type="checkbox" class="el-switch__input"><span class="el-switch__label el-switch__label--left">Off</span><span id="core" class="el-switch__core"><span class="el-switch__action"></span></span></div>`
      )
      expect(await style('#core', 'border-color')).toBe(rgb('#2187a8'))
      await focus('#input')
      expect(await style('#core', 'outline-style')).toBe('solid')
      expect(await style('#core', 'outline-color')).toBe(rgb('#00c4e5'))
      const fill = await style('#core', 'background-color')
      await page.$eval('.el-switch', (el) => el.classList.add('is-disabled'))
      expect(await style('.el-switch', 'opacity')).toBe('0.6')
      expect(await style('#core', 'background-color')).toBe(fill)
    }
  )

  it('distinguishes segmented selection and focus without brightening disabled selection', async () => {
    await renderStates(
      '<div class="el-segmented"><div class="el-segmented__group"><div id="selected" class="el-segmented__item-selected is-focus-visible"></div><div id="disabled" class="el-segmented__item-selected is-disabled"></div><label class="el-segmented__item is-selected">Selected</label></div></div>'
    )
    expect(await style('#selected', 'background-color')).toBe(rgb('#093d7e'))
    expect(await style('#selected', 'box-shadow')).toContain(rgb('#00c4e5'))
    expect(await style('#selected', 'outline-color', '::before')).toBe(
      rgb('#00c4e5')
    )
    expect(await style('#disabled', 'box-shadow')).toBe('none')
  })

  it('shows radio-button selection, hover and keyboard focus', async () => {
    await renderStates(
      '<label class="el-radio-button is-active"><input id="input" class="el-radio-button__original-radio" type="radio" checked><span id="checked" class="el-radio-button__inner">Selected</span></label><label class="el-radio-button"><input class="el-radio-button__original-radio" type="radio"><span id="hover" class="el-radio-button__inner">Other</span></label><label class="el-radio-button is-disabled is-active"><input disabled checked class="el-radio-button__original-radio" type="radio"><span id="disabled" class="el-radio-button__inner">Disabled</span></label>'
    )
    expect(await style('#checked', 'outline-color')).toBe(rgb('#00c4e5'))
    expect(await style('#checked', 'background-color')).toBe(rgb('#093d7e'))
    await page.hover('#hover')
    expect(await style('#hover', 'color')).toBe(rgb('#00c4e5'))
    await focus('#input')
    expect(await style('#checked', 'outline-color')).toBe(rgb('#00c4e5'))
    expect(await style('#checked', 'outline-width')).toBe('2px')
    expect(await style('#disabled', 'outline-color')).not.toBe(rgb('#00c4e5'))
  })

  it.each(['checkbox', 'radio'])(
    '%s bordered selection excludes disabled controls',
    async (type) => {
      await renderStates(
        `<label id="enabled" class="el-${type} is-bordered is-checked">Selected</label><label id="disabled" class="el-${type} is-bordered is-checked is-disabled">Disabled</label>`
      )
      expect(await style('#enabled', 'border-color')).toBe(rgb('#00c4e5'))
      expect(await style('#disabled', 'border-color')).not.toBe(rgb('#00c4e5'))
    }
  )

  it('shows tabs active and fallback bars and keyboard focus', async () => {
    await renderStates(
      '<div class="el-tabs"><div class="el-tabs__header"><div class="el-tabs__nav"><div id="bar" class="el-tabs__active-bar is-hidden"></div><div id="tab" class="el-tabs__item is-active" tabindex="0">Tab</div></div></div></div>'
    )
    expect(await style('#bar', 'background-color')).toBe(rgb('#00c4e5'))
    expect(await style('#tab', 'background-color', '::after')).toBe(
      rgb('#00c4e5')
    )
    await focus('#tab')
    expect(await style('#tab', 'box-shadow')).toContain(rgb('#00c4e5'))
  })

  it('makes finished step text, icon and connector readable', async () => {
    await renderStates(
      '<div class="el-steps"><div class="el-step is-horizontal"><div id="head" class="el-step__head is-finish"><div class="el-step__line"><i id="line" class="el-step__line-inner" style="border-width:1px;width:100%"></i></div><div class="el-step__icon is-text">1</div></div><div class="el-step__main"><div id="title" class="el-step__title is-finish">Finished</div><div id="description" class="el-step__description is-finish">Description</div></div></div></div>'
    )
    for (const selector of ['#head', '#title', '#description'])
      expect(await style(selector, 'color')).toBe(rgb('#00c4e5'))
    expect(await style('#line', 'border-color')).toBe(rgb('#00c4e5'))
  })

  it('keeps today readable in a selected calendar cell', async () => {
    await renderStates(
      '<div class="el-calendar"><table class="el-calendar-table"><tbody><tr><td id="today" class="is-today is-selected"><div class="el-calendar-day">20</div></td></tr></tbody></table></div>'
    )
    expect(await style('#today', 'color')).toBe(rgb('#00c4e5'))
    expect(
      contrast(
        await style('#today', 'color'),
        await style('#today', 'background-color')
      )
    ).toBeGreaterThanOrEqual(4.5)
  })

  it.each(['primary', 'success', 'warning', 'danger', 'info'])(
    '%s tag text, close hover and focus preserve contrast for every effect',
    async (type) => {
      await renderStates(
        ['light', 'plain', 'dark']
          .map(
            (effect) =>
              `<span id="${effect}" class="el-tag el-tag--${type} el-tag--${effect}"><span class="el-tag__content">Tag</span><button id="${effect}-close" class="el-tag__close"><i class="el-icon">×</i></button></span>`
          )
          .join('')
      )
      if (type !== 'primary')
        expect(
          contrast(
            await style('#dark', 'color'),
            await style('#dark', 'background-color')
          )
        ).toBeGreaterThanOrEqual(4.5)
      for (const effect of ['light', 'plain', 'dark']) {
        const close = `#${effect}-close`
        await page.hover(close)
        const black =
          effect !== 'dark' || ['success', 'warning', 'info'].includes(type)
        expect(await style(close, 'color')).toBe(
          rgb(black ? '#000000' : '#ffffff')
        )
        expect(
          contrast(
            await style(close, 'color'),
            await style(close, 'background-color')
          )
        ).toBeGreaterThanOrEqual(4.5)
        await focus(close)
        expect(await style(close, 'outline-color')).toBe(rgb('#00c4e5'))
      }
    }
  )

  it.each(['date', 'month', 'year', 'quarter'])(
    '%s picker focus preserves selected fill and disabled colors',
    async (type) => {
      await renderStates(`<div class="el-picker-panel el-date-picker"><table class="el-${type}-table"><tbody><tr>
      ${['available today', 'available current', 'disabled'].map((state, i) => `<td id="cell-${i}" class="${state}" tabindex="${i === 2 ? -1 : 0}"><div class="el-date-table-cell"><span id="text-${i}" class="el-date-table-cell__text">${i}</span></div></td>`).join('')}
      </tr></tbody></table></div>`)
      expect(await style('#text-0', 'color')).toBe(rgb('#00c4e5'))
      await page.hover('#text-0')
      expect(await style('#text-0', 'background-color')).toBe(rgb('#0a2d48'))
      for (const i of [0, 1]) {
        await focus(`#cell-${i}`)
        expect(await style(`#text-${i}`, 'outline-color')).toBe(rgb('#00c4e5'))
        expect(await style(`#text-${i}`, 'outline-style')).toBe('solid')
      }
      expect(await style('#text-1', 'background-color')).toBe(rgb('#126681'))
      expect(await style('#text-1', 'color')).toBe(rgb('#ffffff'))
      await page.hover('#text-2')
      expect(await style('#text-2', 'color')).not.toBe(rgb('#00c4e5'))
    }
  )

  it('shows time confirmation and hovered arrows in cyan', async () => {
    await renderStates(
      '<div class="el-time-panel"><div class="el-time-spinner"><div class="el-time-spinner__wrapper is-arrow"><i id="arrow" class="el-icon el-time-spinner__arrow arrow-up">↑</i><ul class="el-time-spinner__list"><li class="el-time-spinner__item">11</li><li class="el-time-spinner__item is-active">12</li><li class="el-time-spinner__item">13</li></ul></div></div><button id="confirm" class="el-time-panel__btn confirm">OK</button></div>'
    )
    expect(await style('#confirm', 'color')).toBe(rgb('#00c4e5'))
    await page.hover('#arrow')
    expect(await style('#arrow', 'color')).toBe(rgb('#00c4e5'))
  })

  it('highlights only available transfer items on hover', async () => {
    await renderStates(
      `<div class="el-transfer"><div class="el-transfer-panel">${['', 'is-checked', 'is-disabled'].map((state, i) => `<label id="item-${i}" class="el-checkbox el-transfer-panel__item ${state}"><span class="el-checkbox__input ${state}"><span class="el-checkbox__inner"></span></span><span id="label-${i}" class="el-checkbox__label">Item</span></label>`).join('')}</div></div>`
    )
    await page.hover('#item-0')
    expect(await style('#label-0', 'color')).toBe(rgb('#00c4e5'))
    await page.hover('#item-1')
    expect(await style('#label-1', 'color')).toBe(rgb('#c4d1de'))
    await page.hover('#item-2')
    expect(await style('#label-2', 'color')).toBe(rgb('#596f86'))
  })

  it.each(['', 'success', 'warning', 'exception'])(
    'keeps %s line progress and inside text readable',
    async (status) => {
      await renderStates(
        `<div class="el-progress el-progress--line is-${status}"><div class="el-progress-bar"><div id="track" class="el-progress-bar__outer"><div id="bar" class="el-progress-bar__inner" style="width:50%"><div id="text" class="el-progress-bar__innerText">50%</div></div></div></div></div>`
      )
      expect(await style('#text', 'color')).toBe(rgb('#000000'))
      expect(
        contrast(
          await style('#text', 'color'),
          await style('#bar', 'background-color')
        )
      ).toBeGreaterThanOrEqual(4.5)
      if (!status)
        expect(await style('#bar', 'background-color')).toBe(rgb('#00c4e5'))
      expect(await style('#track', 'outline-style')).toBe('solid')
    }
  )

  it.each([
    'background-color: #550000',
    'background: linear-gradient(to right, #550000, #000055)',
  ])('preserves custom progress %s and inside text', async (background) => {
    await renderStates(
      `<div class="el-progress el-progress--line is-success"><div class="el-progress-bar"><div class="el-progress-bar__outer"><div id="bar" class="el-progress-bar__inner" style="width:50%;${background}"><div id="text" class="el-progress-bar__innerText">50%</div></div></div></div></div>`
    )
    expect(await style('#text', 'color')).toBe(rgb('#ffffff'))
    if (background.includes('gradient'))
      expect(await style('#bar', 'background-image')).toContain(
        'linear-gradient'
      )
    else expect(await style('#bar', 'background-color')).toBe(rgb('#550000'))
  })

  it('restores light component colors after switching dark off', async () => {
    const fixture =
      '<label id="bordered" class="el-checkbox is-bordered is-checked">Checked</label><label class="el-radio-button is-active"><input type="radio" class="el-radio-button__original-radio" checked><span id="radio" class="el-radio-button__inner">Radio</span></label><div class="el-switch is-checked"><input class="el-switch__input"><span id="switch" class="el-switch__core"></span></div><div class="el-segmented"><div id="segmented" class="el-segmented__item-selected"></div></div><div class="el-tabs"><div id="tabs" class="el-tabs__active-bar"></div></div><div id="steps" class="el-step__title is-finish">Done</div><div class="el-calendar"><table class="el-calendar-table"><tbody><tr><td id="calendar" class="is-today is-selected">20</td></tr></tbody></table></div><div class="el-picker-panel"><table class="el-quarter-table"><tbody><tr><td class="today"><span id="date" class="el-date-table-cell__text">Q1</span></td></tr></tbody></table></div><button id="time" class="el-time-panel__btn confirm">OK</button><div class="el-slider"><div class="el-slider__runway"><div id="bar" class="el-slider__bar"></div></div></div><span id="tag" class="el-tag el-tag--success el-tag--dark">Tag</span><div class="el-progress el-progress--line"><div class="el-progress-bar"><div id="progress" class="el-progress-bar__inner"><div id="text" class="el-progress-bar__innerText">50%</div></div></div></div><div class="el-progress el-progress--circle"><svg><path id="circle" stroke="#126681" /></svg></div>'
    await render(fixture, false)
    const properties = [
      ['#bar', 'background-color'],
      ['#tag', 'color'],
      ['#progress', 'background-color'],
      ['#text', 'color'],
      ['#circle', 'stroke'],
      ['#bordered', 'border-color'],
      ['#radio', 'background-color'],
      ['#switch', 'border-color'],
      ['#segmented', 'background-color'],
      ['#tabs', 'background-color'],
      ['#steps', 'color'],
      ['#calendar', 'color'],
      ['#date', 'color'],
      ['#time', 'color'],
    ]
    const light = await Promise.all(
      properties.map(([selector, property]) => style(selector, property))
    )
    await page.$eval(
      'style',
      (el, baseline) => {
        el.textContent = baseline
      },
      lightBaseline
    )
    expect(
      await Promise.all(
        properties.map(([selector, property]) => style(selector, property))
      )
    ).toEqual(light)
    await render(fixture, false)
    await page.evaluate(() => document.documentElement.classList.add('dark'))
    expect(await style('#circle', 'stroke')).toBe(rgb('#126681'))
    await page.evaluate(() => document.documentElement.classList.remove('dark'))
    expect(
      await Promise.all(
        properties.map(([selector, property]) => style(selector, property))
      )
    ).toEqual(light)
  })
})
