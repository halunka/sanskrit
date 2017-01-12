import { h } from 'preact'
import { observer } from 'mobx-preact'

import Structure from '../../molecules/structure'
import Screen from '../../organisms/screen'
import Toolbox from '../../organisms/toolbox'
import Wizard from '../../organisms/wizard'

import mkAdvert from '../../../stores/advert'
import mkToolbox from '../../../stores/toolbox'
import importAdvert from '../../../utils/import'

import styles from './styles.css'

const toolbox = mkToolbox()
// simply use the only available template for now
const advert = mkAdvert(toolbox.templates[0])

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
    </div>
  )
})
