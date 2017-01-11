import R from 'ramda'

import mkField from '../field'
import { validateTruthy } from '../../utils/validate'

import type { Field } from '../field'

export type TextFieldT = Field<string>

export default function mkTextField (value: string, otherAttributes?: Object): TextFieldT {
  return mkField(Object.assign(
    {
      type: 'text',
      validate: R.path(['validate'], otherAttributes) || validateTruthy,
      value
    },
    otherAttributes
  ))
}
