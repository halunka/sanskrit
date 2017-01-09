import React from 'react'
import uuid from 'uuid'

import Screen from '../../ecosystems/screen'
import Structure from '../../ecosystems/structure'
import Toolbox from '../../ecosystems/toolbox'

import mkAdvert from '../../stores/advert'
import mkToolbox from '../../stores/toolbox'
import mkParagraph from '../../stores/elements/paragraph'

import styles from './styles.css'

const toolbox = mkToolbox()
// simply use the only available template for now
const advert = mkAdvert(toolbox.templates[0])

export default () => (
  <div className={styles.container}>
    <sidebar className={styles.tools}>
      <Toolbox toolbox={toolbox} advert={advert} />
      <Structure toolbox={toolbox} advert={advert} />
    </sidebar>
    <main className={styles.main} key='main'>
      <Screen advert={advert} />
    </main>
  </div>
)
