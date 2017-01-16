import { h } from 'preact'
import { observer } from 'mobx-preact'

import { getFilesFromEvent } from '../../utils/dom'

import type { FileFieldT } from '../../stores/fields/file'

export default observer(function FileField (field: FileFieldT) {
  return (
    <input type='file' accept={field.allowedFormats.join(',')} onChange={getFilesFromEvent(field.update)} />
  )
})
