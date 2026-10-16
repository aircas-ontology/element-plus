import { defaultLang } from '../constant'

export function getLanguageHomeRedirect(
  path: string,
  base: string,
  preferred: string | null,
  languages: string[]
): string | undefined {
  if (path !== base && path !== `${base}index.html`) return
  const lang =
    preferred && languages.includes(preferred)
      ? preferred
      : languages.includes(defaultLang)
        ? defaultLang
        : languages[0]
  return lang ? `${base}${lang}/` : undefined
}
