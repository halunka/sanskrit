import R from 'ramda'

import mkField from '../field'

import type { Field } from '../field'

export type SelectFieldT = Field & {
  type: 'select'
}

type SelectFieldInput<V> = {
  data: { [string]: V },
  value?: V
}

export default function mkSelectField ({ data, value }: SelectFieldInput<V>): SelectFieldT {
  return mkField({
    data,
    type: 'text',
    value: value || R.head(data)
  })
}
