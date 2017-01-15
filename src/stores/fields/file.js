import { action } from 'mobx'

import mkField from '../field'

import type { Field } from '../field'

type FileFieldT = Field<string>

export default function mkFileField (value?: string): FileFieldT {
  const field = mkField({
    type: 'file',
    // TODO: proper validation
    validate: () => false,
    value
  })
  return field
}
