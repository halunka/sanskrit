import { observer } from 'mobx-preact'
import { h } from 'preact'
import R from 'ramda'
import i18n from '../../stores/i18n'

import { withValueFromEvent } from '../../utils/dom'

import type { SelectFieldT } from '../../stores/fields/select'

export default observer(function SelectField (field: SelectFieldT) {
  return (
    <select value={field.value} onChange={withValueFromEvent(field.update)}>
      {R.pipe(
        R.mapObjIndexed((value, key, i) => (
          <option key={i} value={value}>{key}</option>
        )),
        R.values
      )(field.data)}
    </select>
  )
})
