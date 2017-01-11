import R from 'ramda'

import { validateTruthy, validateNumber, combine } from '../../utils/validate'

import mkField from '../field'

export type NumberFieldT = {
  type: string,
  value: number,
  update: (newValue: number) => NumberFieldT
}

const numberValidator = combine(validateTruthy, validateNumber)

export default function mkNumberField (value: number, otherAttributes?: Object): NumberFieldT {
  return mkField(Object.assign(
    {
      value,
      validate: R.path(['validate'], otherAttributes) || numberValidator,
      type: 'number'
    },
    otherAttributes
  ))
}
