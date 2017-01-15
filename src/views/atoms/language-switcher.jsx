import { h } from 'preact'
import { observer } from 'mobx-preact'

import type { I18n } from '../../stores/i18n'

type Props = {
  i18n: I18n
}

export default observer(function LanguageSwitcher ({ i18n }: Props) {
  return (
    <section>
      {
        i18n.availableLanguages.map((language) => (
          <button onClick={i18n.setLanguage.bind(null, language)}>{language}</button>
        ))
      }
    </section>
  )
})
