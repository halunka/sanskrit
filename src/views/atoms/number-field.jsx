import { observer } from 'mobx-preact'
import { h } from 'preact'

import { withValueFromEvent } from '../../utils/dom'
import type { NumberFieldT } from '../../stores/fields/number'

const onChange = (field) => withValueFromEvent((v) => field.update(Number(v)))

export default observer(function NumberField (field: NumberFieldT) {
  return (
    <input type='text' onChange={onChange(field)} value={field.value} />
  )
})
