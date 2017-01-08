import React from 'react'
import uuid from 'uuid'

import Screen from './ecosystems/screen.jsx'
import advert from './stores/advert'
import toolbox from './stores/toolbox'
import paragraph from './stores/elements/paragraph'

const toolboxStore = toolbox()
// simply use the only available template for now
const advertStore = advert(toolboxStore.templates[0])
advertStore.elements.push(paragraph({
  // $FlowFixMe: definition doesn't contain `uuid()`
  id: uuid(),
  slot: advertStore.template.slots[0].id,
  position: [0, 0],
  width: advertStore.template.size[0],
  text: 'Veniam deserunt in velit explicabo qui ut error. Numquam ab veritatis molestiae itaque sed quos voluptatem est. Perferendis harum in qui molestias minus soluta. Dignissimos doloremque modi soluta aut consequatur vitae molestias omnis. Fugit repudiandae repellat natus. Culpa vel et eius itaque maxime odit consequatur et.'
}))

export default () => (
  <main key='main'>
    <Screen advert={advertStore} />
  </main>
)
