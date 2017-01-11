import R from 'ramda'

import { validateTruthy, validateNumber, combine } from '../../utils/validate'

import field from '../field'

export type NumberField = {
  type: string,
  value: number,
  update: (newValue: number) => NumberField
}

const numberValidator = combine(validateTruthy, validateNumber)

export default (value: number, otherAttributes?: Object): NumberField => field(Object.assign(
  {
    value,
    validate: R.path(['validate'], otherAttributes) || numberValidator,
    type: 'number'
  },
  otherAttributes
))
