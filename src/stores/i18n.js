/* @file i18n
 * Store containing all translations and the current language
 */
import { observable, action, computed, extendObservable } from 'mobx'

export type Language = 'en' | 'de'
export type Translations = { [Language]: string }

export type I18n = {
  language: Language,
  add: (key: string, translations: Translations) => { [string]: string },
  setLanguage: (language: Language) => I18n,
  t: { [string]: string }
}

const i18n: I18n = observable({
  /* default language */
  // TODO: derive this from the navigator
  language: 'en',
  add: action((key: string, translations: Translations) =>
    extendObservable(i18n.t, {
      [key]: computed(() => translations[i18n.language])
    })
  ),
  setLanguage: action((language: Language) => {
    i18n.language = language
  }),
  t: {}
})

export default i18n
