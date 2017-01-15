import { observer } from 'mobx-preact'
import { h } from 'preact'

import { withValueFromEvent } from '../../utils/dom'
import type { TextFieldT } from '../../stores/fields/text'

export default observer(function TextField (field: TextFieldT) {
  const handleChange = withValueFromEvent(field.update)
  return (
    <textarea
      type='text'
      onKeyUp={handleChange}
      onChange={handleChange}
      value={field.value}
      rows='8'
      />
  )
})
