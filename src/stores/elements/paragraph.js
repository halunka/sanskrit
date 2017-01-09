import { observable, computed, asReference } from 'mobx'
import uuid from 'uuid'

import { wrapText } from '../../utils/wrap-text'
import textField from '../fields/text'
import numberField from '../fields/number'

import type { TextField } from '../fields/text'
import type { NumberField } from '../fields/number'
import type { FPosition, FSize } from '../../utils'

export type Paragraph = {
  id: string,
  type: string,
  slot?: string,
  size: FSize,
  position: FPosition,
  data: {
    text: TextField,
    fontSize: NumberField,
    lineHeight: NumberField,
  },
  lines: Array<string>
}

export default (slot: string): Paragraph => {
  const paragraph = observable({
    id: asReference(uuid()),
    slot,
    size: {
      autoWidth: true,
      height: computed(() => paragraph.data.lineHeight.value * paragraph.lines.length + paragraph.padding * 2)
    },
    position: { left: 0 },
    type: 'paragraph',
    padding: 1,
    data: {
      text: textField(''),
      fontSize: numberField(1),
      lineHeight: numberField(1.2)
    },
    lines: computed(() => wrapText(
      paragraph.size.width,
      paragraph.data.fontSize.value,
      paragraph.data.text.value,
    ))
  })
  return paragraph
}
