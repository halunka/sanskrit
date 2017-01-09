import React from 'react'
import R from 'ramda'

import { withValueFromEvent } from '../utils/dom'
import i18n from '../stores/i18n'

import type { SelectField } from '../stores/fields/sleect'

export default (field: SelectField) => (
  <select value={field.value} onChange={withValueFromEvent(field.update)}>
    {R.mapObjIndexed((value, key) => (
      <option value={value}>{i18n.t[key]}</option>
    ), field.data)}
  </select>
)
