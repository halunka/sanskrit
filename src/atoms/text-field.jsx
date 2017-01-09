import React from 'react'

import { withValueFromEvent } from '../utils/dom'
import type { TextField } from '../stores/fields/text'

export default (field: TextField) => (
  <input type='text' onChange={withValueFromEvent(field.update)} value={field.value} />
)
