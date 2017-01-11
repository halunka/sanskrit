import { observable, asReference, computed } from 'mobx'
import R from 'ramda'

import type { FPosition, FSize } from '../utils'

export type ElementT<T> = {
  type: string,
  id: string,
  slot?: string,
  /* position in percentages relative to the element slot */
  position: FPosition,
  /* size in percentages relative to the element slot */
  size: FSize,
  data: T,
  valid: boolean
}

export default function mkElement <T> ({ type, id, slot, position, size, data }: ElementT<T>, otherAttributes: Object): ElementT<T> {
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
