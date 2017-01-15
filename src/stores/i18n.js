/* @file i18n
 * Store containing all translations and the current language
 */
import { observable, action, computed, extendObservable, asReference } from 'mobx'
import R from 'ramda'

import en from '../data/i18n/en'
import de from '../data/i18n/de'

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
  language: (R.path(['navigator', 'language'], window) || '').split('-')[0],
  availableLanguages: asReference([ 'en', 'de' ]),
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

R.mapObjIndexed((v, k) => {
  i18n.add(k, {
    en: v,
    de: de[k]
  })
}, en)

export default i18n
