import { observer } from 'mobx-react'
import React from 'react'
import R from 'ramda'

import { withValueFromEvent } from '../../utils/dom'
import i18n from '../../stores/i18n'

import type { SelectFieldT } from '../../stores/fields/select'

export default observer(function SelectField (field: SelectFieldT) {
  return (
    <select value={field.value} onChange={withValueFromEvent(field.update)}>
      {R.mapObjIndexed((value, key) => (
        <option value={value}>{i18n.t[key]}</option>
      ), field.data)}
    </select>
  )
})
