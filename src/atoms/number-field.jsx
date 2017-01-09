import React from 'react'

import { withValueFromEvent } from '../utils/dom'
import type { NumberField } from '../stores/fields/number'

const onChange = (field) => withValueFromEvent((v) => field.update(Number(v)))

export default (field: NumberField) => (
  <input type='number' onChange={onChange(field)} value={field.value} />
)
