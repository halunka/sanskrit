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
  id: uuid(),
  type: 'paragraph',
  position: [],
  size: 0,
  text: ''
}))

export default function Application () {
  return [
    (<sidebar key='sidebar'>
        //<Toolbox elements={elementsStore} />
    </sidebar>),
    (<main key='main'>
      <Screen advert={advertStore} />
    </main>)
  ]
}
