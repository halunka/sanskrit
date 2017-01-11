import { observable, asReference, computed } from 'mobx'
import R from 'ramda'

import type { FPosition, FSize } from '../utils'

export type Element<T> = {
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

export default <T>({ type, id, slot, position, size, data }: Element<T>, otherAttributes: object): Element<T> => {
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
