import { observable, asReference } from 'mobx'

import type { Field } from './field'
import type { Position, Size } from '../utils'

export type Element<T> = {
  type: string,
  id: string,
  slot?: string,
  /* position in percentages relative to the element slot */
  position: Position,
  /* size in percentages relative to the element slot */
  size: Size,
  data: T
}

export default <T>({ type, id, slot, position, size, data }: Element<T>): Element<T> => observable({
  id: asReference(id),
  type: asReference(type),
  slot,
  position,
  size,
  data
})
