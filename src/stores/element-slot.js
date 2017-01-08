import { observable, asReference } from 'mobx'

import type { Size, Position } from '../utils'

export type ElementSlot = {
  id: string,
  position: Position,
  size: Size
}

export default ({ id, position, size }: ElementSlot): ElementSlot => observable({
  id: asReference(id),
  position,
  size
})
