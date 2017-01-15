import { h } from 'preact'
import { observer } from 'mobx-preact'
import R from 'ramda'

import LanguageSwitcher from '../../atoms/language-switcher'
import Structure from '../../molecules/structure'
import Screen from '../../organisms/screen'
import Toolbox from '../../organisms/toolbox'
import Wizard from '../../organisms/wizard'
import i18n from '../../../stores/i18n'
import mkAdvert from '../../../stores/advert'
import mkToolbox from '../../../stores/toolbox'
import importAdvert from '../../../utils/import'
import * as storage from '../../../utils/storage'
import {getLanguageFromNavigator} from '../../../utils/dom'

import styles from './styles.css'
import '../../../styles'

const toolbox = mkToolbox()
// simply use the only available template for now
const storedAdvert = storage.load('advert')
const advert = storedAdvert
  ? importAdvert(storedAdvert, toolbox)
  : mkAdvert(toolbox.templates[0])

const storedLanguage = storage.load('language')
i18n.setLanguage(storedLanguage || getLanguageFromNavigator())

/* link up localStorage */
const callExport = (a) => a.export()
storage.observe('advert', advert, 5000, callExport)
storage.observe('language', i18n, false, R.prop('language'))
window.addEventListener('unload', () => {
  storage.save('advert', advert.export())
})

export default observer(function Application () {
  return (
    <div className={styles.container}>
      <sidebar className={styles.tools}>
        <Toolbox toolbox={toolbox} advert={advert} />
        <Structure toolbox={toolbox} advert={advert} />
        {advert.wizardElement && (
          <Wizard advert={advert} />
        )}
      </sidebar>
      <main className={styles.main} key='main'>
        <Screen advert={advert} />
      </main>
      <LanguageSwitcher i18n={i18n} />
    </div>
  )
})
