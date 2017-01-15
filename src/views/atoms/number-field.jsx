import { observer } from 'mobx-preact'
import { h } from 'preact'

import { withValueFromEvent } from '../../utils/dom'
import type { NumberFieldT } from '../../stores/fields/number'

const onChange = (field) => withValueFromEvent((v) => field.update(Number(v)))

export default observer(function NumberField (field: NumberFieldT) {
  const handleChange = onChange(field)
  return (
    <input
      type='text'
      onChange={handleChange}
      onKeyUp={handleChange}
      value={field.value}
      />
  )
})
