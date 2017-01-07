import { observable, asReference } from 'mobx'

import type { Field } from './field'
import type { Position, Size } from '../types/utils'

export type Element = {
  type: string,
  id: string,
  /* position in percentages relative to the element slot */
  position: Position,
  /* size in percentages relative to the element slot */
  size: Size,
  data: { [string]: Field }
}

export default ({ type, id, position, size, data }: Element): Element => observable({
  id: asReference(id),
  type: asReference(type),
  position,
  size,
  data
})
