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
  type: 'paragraph',
  position: [0, 0],
  size: 0,
  text: ''
}))

export default () => (
  <main key='main'>
    <Screen advert={advertStore} />
  </main>
)
