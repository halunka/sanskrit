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
      id: uuid(),
      name: 'simple-immo',
      size: [ 54, 58 ],
      slots: [
        elementSlot({
          id: uuid(),
          size: [ 50, 54 ],
          position: [ 2, 2 ]
        })
      ]
    })
  ],
  elements: []
})
