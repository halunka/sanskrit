import { observable, asReference } from 'mobx'

import type { FSize, FPosition } from '../utils'
import type { Element } from './element'

export type ElementSlot = {
  id: string,
  position: FPosition,
  size: FSize,
  elements: Array<Element<any>>
}

export type ElementSlotParams = {
  id: string,
  position: FPosition,
  size: FSize
}

export default ({ id, position, size }: ElementSlotParams): ElementSlot => observable({
  id: asReference(id),
  position,
  size
})
