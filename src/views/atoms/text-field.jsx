import { observer } from 'mobx-react'
import React from 'react'

import { withValueFromEvent } from '../../utils/dom'
import type { TextFieldT } from '../../stores/fields/text'

export default observer(function TextField (field: TextFieldT) {
  return (
    <textarea
      type='text'
      onChange={withValueFromEvent(field.update)}
      value={field.value}
      />
  )
})
