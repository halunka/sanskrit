import { action } from 'mobx'

import mkField from '../field'

import type { Field } from '../field'

type FileFieldT = Field<string>
type FileDescriptor = {|
  content: string,
  name: string
|}

export default function mkFileField (value?: FileDescriptor, otherAttributes?: Object): FileFieldT {
  const field = mkField(Object.assign({
    type: 'file',
    // TODO: proper validation
    validate: () => false,
    value
  }, otherAttributes))
  return field
}
