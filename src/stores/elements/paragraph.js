import { observable } from 'mobx'

import textField from '../fields/text'
import selectField from '../fields/select'

import type { SelectField } from '../fields/select'
import type { TextField } from '../fields/text'
import type { Position, Size } from '../../utils'

const sizes = [
  [100, 20],
  [100, 40],
  [100, 60]
]

export type Paragraph = {
  id: string,
  type: string,
  slot?: string,
  position: Position,
  size: Size,
  data: {
    text: TextField,
    size: SelectField<number, Size>
  }
}

type ParagraphInput = {
  id: string,
  slot: string,
  position: Position,
  size: number,
  text: string
}

export default ({ id, slot, position, size, text }: ParagraphInput): Paragraph => observable({
  id,
  slot,
  position,
  size,
  type: 'paragraph',
  data: {
    text: textField(text),
    size: selectField({ options: sizes, input: size })
  }
})
