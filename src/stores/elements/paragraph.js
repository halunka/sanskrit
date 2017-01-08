import { observable, computed, asReference } from 'mobx'

import { wrapText } from '../../utils/text-area.js'
import textField from '../fields/text'
import selectField from '../fields/select'
import numberField from '../fields/number'

import type { SelectField } from '../fields/select'
import type { TextField } from '../fields/text'
import type { NumberField } from '../fields/number'
import type { FPosition, FSize } from '../../utils'

const sizes = [
  [100, 20],
  [100, 40],
  [100, 60]
]

export type Paragraph = {
  id: string,
  type: string,
  slot?: string,
  position: FPosition,
  size: FSize,
  data: {
    text: TextField,
    size: SelectField<number, FSize>,
    fontSize: NumberField,
    lineHeight: NumberField,
  },
  lines: Array<string>
}

type ParagraphInput = {
  id: string,
  slot: string,
  position: FPosition,
  width: number,
  text: string
}

export default ({ id, slot, position, width, text }: ParagraphInput): Paragraph => {
  const paragraph = observable({
    id: asReference(id),
    slot,
    position,
    size: [
      width,
      computed(() => paragraph.data.size.value)
    ],
    type: 'paragraph',
    data: {
      text: textField(text),
      size: selectField({ options: sizes, input: 0 }),
      fontSize: numberField(1),
      lineHeight: numberField(1.2)
    },
    lines: computed(() => wrapText(
      paragraph.size[0],
      paragraph.data.fontSize.value,
      paragraph.data.text.value,
    ))
  })
  return paragraph
}
