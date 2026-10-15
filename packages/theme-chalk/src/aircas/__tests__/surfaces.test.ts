import { resolve } from 'node:path'
import { compile } from 'sass-embedded'
import { afterEach, beforeAll, describe, expect, it } from 'vitest'

const components = [
  'table',
  'dialog',
  'message-box',
  'popper',
  'popover',
  'dropdown',
  'message',
  'notification',
  'alert',
  'card',
  'descriptions',
  'drawer',
]
let rules: CSSStyleRule[]
let notificationRules: CSSStyleRule[]
const fixtures: HTMLElement[] = []
const initiallyDark = document.documentElement.classList.contains('dark')

beforeAll(() => {
  const directory = resolve('packages/theme-chalk/src/aircas')
  const style = document.createElement('style')
  style.textContent = compile(`${directory}/index.scss`).css
  document.head.append(style)
  rules = Array.from(style.sheet!.cssRules) as CSSStyleRule[]
  style.remove()
  style.textContent = compile(
    resolve('packages/theme-chalk/src/notification.scss')
  ).css
  document.head.append(style)
  notificationRules = Array.from(style.sheet!.cssRules).filter(
    (rule) => 'selectorText' in rule
  ) as CSSStyleRule[]
  style.remove()
})

afterEach(() => {
  fixtures.splice(0).forEach((fixture) => fixture.remove())
  document.documentElement.classList.toggle('dark', initiallyDark)
})

const fixture = (html: string, dark = true) => {
  document.documentElement.classList.toggle('dark', dark)
  const wrapper = document.createElement('div')
  wrapper.innerHTML = html
  document.body.append(wrapper)
  fixtures.push(wrapper)
  return wrapper
}

const declarations = (element: Element, source = rules) =>
  Object.fromEntries(
    source
      .filter(
        ({ selectorText }) =>
          selectorText &&
          !selectorText.includes('::') &&
          element.matches(
            selectorText
              .replace(/:hover/g, '.test-hover')
              .replace(/:focus/g, '.test-focus')
          )
      )
      .flatMap(({ style }) =>
        Array.from({ length: style.length }, (_, index) => {
          const name = style[index]
          return [name, style.getPropertyValue(name).trim()]
        })
      )
  )

describe('AirCAS dark surfaces', () => {
  it('compiles every component exception independently', () => {
    for (const name of components) {
      expect(() =>
        compile(
          resolve(`packages/theme-chalk/src/aircas/components/${name}.scss`)
        )
      ).not.toThrow()
    }
  })
  it('keeps table selection and hover distinct from stripes without changing nested fills', () => {
    const wrapper = fixture(
      '<div class="el-table el-table--striped"><table class="el-table__body"><tbody><tr class="el-table__row--striped"><td class="el-table__cell"><div class="el-select"></div></td></tr></tbody></table></div>'
    )
    const table = wrapper.firstElementChild!
    expect(declarations(table)['--el-table-row-hover-bg-color']).toBe('#0a2d48')
    expect(declarations(table)['--el-table-current-row-bg-color']).toBe(
      '#093d7e'
    )
    expect(declarations(table)['--el-fill-color-lighter']).toBeUndefined()
    const row = wrapper.querySelector('tr')!
    const cell = wrapper.querySelector('td')!
    expect(declarations(cell)['background-color']).toBe('#01182f')
    for (const state of ['current-row', 'hover-row', 'test-hover']) {
      row.className = `el-table__row--striped ${state}`
      expect(declarations(cell)['background-color']).not.toBe('#01182f')
    }
  })

  it('overrides Popover dark variables separately from Tooltip variables', () => {
    const wrapper = fixture('<div class="el-popper el-popover is-dark"></div>')
    const values = declarations(wrapper.firstElementChild!)
    expect(values['--el-popover-bg-color']).toBe('#12314c')
    expect(values['--el-popover-border-color']).toBe('#24526b')
    expect(values['--el-popover-title-text-color']).toBe(
      'var(--el-text-color-primary)'
    )
    expect(values.color).toBe('var(--el-text-color-regular)')
  })

  it('matches light and dark popper arrow borders to the floating panel', () => {
    for (const effect of ['light', 'dark']) {
      const arrowRule = rules.find(
        ({ selectorText }) =>
          selectorText ===
          `:root.dark .el-popper.is-${effect} > .el-popper__arrow::before`
      )
      expect(arrowRule?.style.getPropertyValue('border-color')).toBe(
        effect === 'dark' ? '#24526b' : 'var(--el-border-color)'
      )
      const wrapper = fixture(
        `<div class="el-popper el-popover is-${effect}"></div>`
      )
      expect(
        declarations(wrapper.firstElementChild!)['--el-popover-border-color']
      ).toBe(effect === 'dark' ? '#24526b' : 'var(--el-border-color)')
    }
  })

  it.each(['success', 'warning', 'error', 'info'])(
    'retains %s message icons and plain surfaces while making content readable',
    (type) => {
      const wrapper = fixture(
        `<div class="el-message el-message--${type}"><p class="el-message__content"></p><i class="el-message-icon--${type}"></i></div>`
      )
      const message = wrapper.firstElementChild!
      expect(declarations(message)['--el-message-border-color']).toBe(
        type === 'info' ? '#29445e' : `var(--el-color-${type}-light-7)`
      )
      expect(declarations(wrapper.querySelector('p')!).color).toBe(
        'var(--el-text-color-regular)'
      )
      expect(declarations(wrapper.querySelector('i')!).color).toBeUndefined()
      message.classList.add('is-plain')
      expect(declarations(message)['background-color']).toBeUndefined()
      expect(declarations(message)['border-color']).toBeUndefined()
    }
  )

  it('only changes light alert text and the info background, preserving dark effects', () => {
    const wrapper = fixture(
      '<div class="el-alert el-alert--info is-light"><span class="el-alert__title"></span><p class="el-alert__description"></p></div>'
    )
    const alert = wrapper.firstElementChild!
    expect(declarations(alert)['--el-alert-bg-color']).toBe('#223147')
    expect(declarations(wrapper.querySelector('span')!).color).toBe(
      'var(--el-text-color-regular)'
    )
    expect(declarations(wrapper.querySelector('p')!).color).toBe(
      'var(--el-text-color-regular)'
    )
    alert.classList.replace('is-light', 'is-dark')
    expect(declarations(wrapper.querySelector('p')!).color).toBeUndefined()
  })

  it('uses the surface directly on notifications and local card/descriptions variables', () => {
    const wrapper = fixture(
      '<div class="el-notification"></div><div class="el-card"></div><div class="el-descriptions"><span class="el-descriptions__label el-descriptions__cell is-bordered-label"></span></div>'
    )
    expect(declarations(wrapper.children[0])['background-color']).toBe(
      'var(--el-bg-color)'
    )
    expect(
      declarations(wrapper.children[0])['--el-notification-bg-color']
    ).toBeUndefined()
    expect(declarations(wrapper.children[1])['--el-card-border-color']).toBe(
      'var(--el-border-color)'
    )
    expect(declarations(wrapper.children[1]).color).toBe(
      'var(--el-text-color-regular)'
    )
    expect(
      declarations(wrapper.children[0], [...notificationRules, ...rules])[
        '--el-notification-title-color'
      ]
    ).toBe('var(--el-text-color-primary)')
    expect(
      declarations(wrapper.children[2])[
        '--el-descriptions-item-bordered-label-background'
      ]
    ).toBe('#07243e')
    expect(declarations(wrapper.querySelector('span')!).color).toBe(
      'var(--el-text-color-secondary)'
    )
  })

  it('gives dialog close controls readable defaults while retaining native interaction', () => {
    for (const name of ['dialog', 'message-box']) {
      const wrapper = fixture(
        `<div class="el-${name}"><button class="el-${name}__headerbtn"><i class="el-${name}__close"></i></button></div>`
      )
      expect(declarations(wrapper.querySelector('i')!).color).toBe(
        'var(--el-text-color-primary)'
      )
      wrapper.querySelector('button')!.classList.add('test-hover')
      expect(declarations(wrapper.querySelector('i')!).color).toBeUndefined()
    }
  })

  it('leaves new surface rules inactive in Light', () => {
    const wrapper = fixture(
      '<div class="el-popper el-popover is-dark"></div><div class="el-message"><p class="el-message__content"></p></div><div class="el-card"></div><div class="el-notification"></div><div class="el-descriptions"></div><div class="el-drawer__header"></div>',
      false
    )
    for (const element of wrapper.querySelectorAll('*'))
      expect(declarations(element)).toEqual({})
  })

  it('supplies Dropdown native hover variables without overriding disabled items', () => {
    const wrapper = fixture(
      '<div class="el-popper el-dropdown__popper is-light"><ul class="el-dropdown-menu"><li class="el-dropdown-menu__item is-disabled test-hover"></li></ul></div>'
    )
    expect(
      declarations(wrapper.firstElementChild!)[
        '--el-dropdown-menuItem-hover-fill'
      ]
    ).toBe('#093d7e')
    expect(
      declarations(wrapper.firstElementChild!)[
        '--el-dropdown-menuItem-hover-color'
      ]
    ).toBe('var(--el-text-color-primary)')
    expect(declarations(wrapper.firstElementChild!)['border-color']).toBe(
      'var(--el-border-color)'
    )
    expect(declarations(wrapper.querySelector('li')!)).toEqual({})
  })

  it('uses regular drawer heading text and cyan close controls in every state', () => {
    const wrapper = fixture(
      '<div class="el-drawer"><header class="el-drawer__header"><button class="el-drawer__close-btn"><i></i></button></header></div>'
    )
    expect(declarations(wrapper.querySelector('header')!).color).toBe(
      'var(--el-text-color-regular)'
    )
    expect(declarations(wrapper.querySelector('button')!).color).toBe('#00c4e5')
    for (const state of ['test-hover', 'test-focus']) {
      wrapper.querySelector('button')!.className =
        `el-drawer__close-btn ${state}`
      expect(declarations(wrapper.querySelector('i')!).color).toBe('#00c4e5')
    }
  })
})
