import { observable, asReference } from 'mobx'

import type { FSize, FPosition } from '../utils'

export type ElementSlot = {
  id: string,
  position: FPosition,
  size: FSize
}

export default ({ id, position, size }: ElementSlot): ElementSlot => observable({
  id: asReference(id),
  position,
  size
})
