import uuid from 'uuid'

import template from './template'
import elementSlot from './element-slot'

import type { Template } from './template'
import type { Element } from './element'

export type Toolbox = {
  templates: Array<Template>,
  // FIXME: `any` should really be a generic
  elements: Array<Element<any>>,
}

export default (): Toolbox => ({
  templates: [
    template({
      // $FlowFixMe: definition doesn't contain `uuid()`
      id: uuid(),
      name: 'simple-immo',
      size: { width: 54, height: 58 },
      slots: [
        elementSlot({
          // $FlowFixMe: definition doesn't contain `uuid()`
          id: uuid(),
          size: { width: 50, height: 54 },
          position: { left: 2, top: 2 }
        })
      ]
    })
  ],
  elements: []
})
