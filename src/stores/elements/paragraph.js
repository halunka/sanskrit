import { observable } from 'mobx'

import textField, { TextField } from '../fields/text'
import selectField, { SelectField } from '../fields/select'

import type { Position, Size } from '../../types/utils'

const sizes = [
  [100, 20],
  [100, 40],
  [100, 60]
]

export type Paragraph = {
  id: string,
  type: 'paragraph',
  position: Position,
  size: Size,
  data: {
    text: TextField,
    size: SelectField<$Keys<typeof sizes>, Size>
  }
}

type ParagraphInput = {
  id: string,
  position: Position,
  size: $Keys<sizes>,
  text: string
}

export default ({ id, position, size, text }: ParagraphInput): Paragraph => observable({
  id,
  position,
  size,
  type: 'paragraph',
  data: {
    text: textField(text),
    size: selectField(sizes)
  }
})
