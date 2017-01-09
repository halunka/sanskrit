import React from 'react'
import uuid from 'uuid'

import Screen from '../../ecosystems/screen'
import Structure from '../../ecosystems/structure'
import mkAdvert from '../../stores/advert'
import mkToolbox from '../../stores/toolbox'
import mkParagraph from '../../stores/elements/paragraph'

import styles from './styles.css'

const toolboxStore = mkToolbox()
// simply use the only available template for now
const advert = mkAdvert(toolboxStore.templates[0])
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
    <main className={styles.main} key='main'>
      <Screen advert={advert} />
    </main>
    <sidebar className={styles.structure}>
      <Structure advert={advert} />
    </sidebar>
  </div>
)
