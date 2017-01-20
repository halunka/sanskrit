import mkTemplate from './template'
import mkElementSlot from './element-slot'
import mkText from './elements/text'
import mkImage from './elements/image'

import type { Template } from './template'
import type { ElementA } from './element'

export type ToolboxT = {
  templates: Array<Template>,
  // FIXME: `any` should really be a generic
  elementFactories: { [string]: (slot: string) => ElementA },
}

export default function mkToolbox (): ToolboxT {
  return {
    templates: [
      mkTemplate({
        id: 'b280eee8-a52d-45fd-a909-8bf5883edb31',
        name: 'simple-immo',
        size: { width: 54, height: 58 },
        slots: [
          mkElementSlot({
            id: '9fd0dcd9-e67b-41ef-909b-2987673be430',
            size: { width: 50, height: 54 },
            position: { left: 2, top: 2 }
          })
        ]
      })
    ],
    /* just because it sound cool... */
    elementFactories: {
      text: mkText,
      image: mkImage
    }
  }
}
