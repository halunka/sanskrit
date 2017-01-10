import uuid from 'uuid'

import template from './template'
import elementSlot from './element-slot'
import mkParagraph from './elements/paragraph'

import type { Template } from './template'
import type { Element } from './element'

export type Toolbox = {
  templates: Array<Template>,
  // FIXME: `any` should really be a generic
  elementFactories: { [string]: (slot: string) => Element<any> },
}

export default (): Toolbox => ({
  templates: [
    template({
      id: 'b280eee8-a52d-45fd-a909-8bf5883edb31',
      name: 'simple-immo',
      size: { width: 54, height: 58 },
      slots: [
        elementSlot({
          // $FlowFixMe: definition doesn't contain `uuid()`
          id: '9fd0dcd9-e67b-41ef-909b-2987673be430',
          size: { width: 50, height: 54 },
          position: { left: 2, top: 2 }
        })
      ]
    })
  ],
  /* just because it sound cool... */
  elementFactories: {
    paragraph: mkParagraph
  }
})
