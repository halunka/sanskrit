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
advert.addElement(mkParagraph({
  // $FlowFixMe: definition doesn't contain `uuid()`
  id: uuid(),
  slot: advert.template.slots[0].id,
  width: advert.template.size.width,
  text: 'Veniam deserunt in velit explicabo qui ut error. Numquam ab veritatis molestiae itaque sed quos voluptatem est. Perferendis harum in qui molestias minus soluta. Dignissimos doloremque modi soluta aut consequatur vitae molestias omnis. Fugit repudiandae repellat natus. Culpa vel et eius itaque maxime odit consequatur et.'
}))

advert.addElement(mkParagraph({
  // $FlowFixMe: definition doesn't contain `uuid()`
  id: uuid(),
  slot: advert.template.slots[0].id,
  width: advert.template.size.width,
  text: 'Veniam deserunt in velit explicabo qui ut error. Numquam ab veritatis molestiae itaque sed quos voluptatem est. Perferendis harum in qui molestias minus soluta. Dignissimos doloremque modi soluta aut consequatur vitae molestias omnis. Fugit repudiandae repellat natus. Culpa vel et eius itaque maxime odit consequatur et.'
}))

export default () => (
  <div className={styles.container}>
    <sidebar className={styles.tools}>
      <Toolbox toolbox={toolbox} advert={advert} />
      <Structure advert={advert} />
    </sidebar>
    <main className={styles.main} key='main'>
      <Screen advert={advert} />
    </main>
  </div>
)
