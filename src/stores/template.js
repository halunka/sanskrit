import { observable, asReference } from 'mobx'

import type { Size } from '../utils'
import type { ElementSlot } from './element-slot'

export type Template = {
  id: string,
  name: string,
  size: Size,
  slots: Array<ElementSlot>
}

export default ({ id, name, slots, size }: Template): Template => observable({
  id: asReference(id),
  name: asReference(name),
  slots,
  size
})
