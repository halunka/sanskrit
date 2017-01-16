import { observer } from 'mobx-preact'
import { h } from 'preact'
import R from 'ramda'

import { withValueFromEvent } from '../../utils/dom'

import type { SelectFieldT } from '../../stores/fields/select'

export default observer(function SelectField (field: SelectFieldT) {
  return (
    <select onChange={withValueFromEvent(field.update)}>
      {R.pipe(
        R.mapObjIndexed((value, key, i) => (
          <option
            key={i + value + key}
            value={value}
            selected={value === field.value}
            >
            {key}
          </option>
        )),
        R.values
      )(field.data)}
    </select>
  )
})
