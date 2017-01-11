import R from 'ramda'

import field from '../field'
import { validateTruthy } from '../../utils/validate'

import type { Field } from '../field'

export type TextField = Field & {
  type: 'text',
}

export default (value: string, otherAttributes?: Object): TextField => field(Object.assign(
  {
    type: 'text',
    validate: R.path(['validate'], otherAttributes) || validateTruthy,
    value
  },
  otherAttributes
))
