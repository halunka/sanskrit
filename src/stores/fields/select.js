import R from 'ramda'

import mkField from '../field'

import type { Field } from '../field'

export type SelectFieldT = Field<string>

type SelectFieldInput<V> = {
  data: { [string]: V },
  value?: string
}

export default function mkSelectField ({ data, value }: SelectFieldInput<*>): SelectFieldT {
  return mkField({
    data,
    type: 'text',
    value: value || R.head(data)
  })
}
