import R from 'ramda'

import mkField from '../field'
import { validateTruthy } from '../../utils/validate'

import type { Field } from '../field'

export type SelectFieldT = Field<string>

export default function mkSelectField <V> (data: { [string]: V }, value?: V): SelectFieldT {
  return mkField({
    type: 'select',
    validate: validateTruthy,
    data,
    value,
  })
}
