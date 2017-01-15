import { observable, asReference, computed } from 'mobx'
import R from 'ramda'

import type { FPosition, Position, FSize, Size } from '../utils'
import type { ParagraphT } from './elements/paragraph'

// An intersection of all element types
export type ElementA = ParagraphT

export type ElementT<T> = {
  type: string,
  id: string,
  slot?: string,
  /* position in percentages relative to the element slot */
  position: FPosition,
  /* size in percentages relative to the element slot */
  size: FSize,
  data: T,
  valid: boolean,
  preview: string
}

type ElementParam<T> = {
  type: string,
  id: string,
  slot?: string,
  position: Position,
  size: Size,
  data: T
}

export default function mkElement <T, O: *> ({ type, id, slot, position, size, data }: ElementParam<T>, otherAttributes?: O): O & ElementT<T> {
  const element = observable(Object.assign(
    {
      id: asReference(id),
      type: asReference(type),
      slot,
      position,
      size,
      data,
      valid: computed(() => R.all(R.prop('valid'), R.values(element.data)))
    },
    otherAttributes
  ))
  return element
}
