import { describe, expect, it } from 'vitest'
import { defaultLang } from '../../constant'
import { getLanguageHomeRedirect } from '../language'

const langs = ['en-US', 'zh-CN']

describe('documentation language preference', () => {
  it('defaults to Chinese on the root page', () => {
    expect(defaultLang).toBe('zh-CN')
    expect(getLanguageHomeRedirect('/', '/', null, langs)).toBe('/zh-CN/')
  })

  it('honors a saved English preference on subsequent root visits', () => {
    expect(getLanguageHomeRedirect('/', '/', 'en-US', langs)).toBe('/en-US/')
  })

  it('leaves explicit language routes unchanged', () => {
    expect(
      getLanguageHomeRedirect('/en-US/component/button', '/', 'zh-CN', langs)
    ).toBeUndefined()
    expect(
      getLanguageHomeRedirect('/zh-CN/', '/', 'en-US', langs)
    ).toBeUndefined()
  })

  it('supports a deployment base and index.html', () => {
    expect(
      getLanguageHomeRedirect('/docs/index.html', '/docs/', null, langs)
    ).toBe('/docs/zh-CN/')
  })

  it('ignores unavailable preferences and supports English-only previews', () => {
    expect(getLanguageHomeRedirect('/', '/', 'invalid', langs)).toBe('/zh-CN/')
    expect(getLanguageHomeRedirect('/', '/', 'zh-CN', ['en-US'])).toBe(
      '/en-US/'
    )
  })
})
