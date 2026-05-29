export type Locale = 'zh' | 'en'

export type LocalizedText = Record<Locale, string>

export const localeLabels: Record<Locale, string> = {
  zh: '中文',
  en: 'EN',
}

export function text(value: LocalizedText, locale: Locale) {
  return value[locale]
}
