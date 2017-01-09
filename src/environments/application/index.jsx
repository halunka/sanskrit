import React from 'react'
import { observer } from 'mobx-react'

import Screen from '../../organisms/screen'
import Structure from '../../organisms/structure'
import Toolbox from '../../organisms/toolbox'
import Wizard from '../../organisms/wizard'

import mkAdvert from '../../stores/advert'
import mkToolbox from '../../stores/toolbox'

import styles from './styles.css'

const toolbox = mkToolbox()
// simply use the only available template for now
const advert = mkAdvert(toolbox.templates[0])

export default observer(() => (
  <div className={styles.container}>
    <sidebar className={styles.tools}>
      <Toolbox toolbox={toolbox} advert={advert} />
      <Structure toolbox={toolbox} advert={advert} />
      {advert.wizard && (
        <Wizard advert={advert} />
      )}
    </sidebar>
    <main className={styles.main} key='main'>
      <Screen advert={advert} />
    </main>
  </div>
))
