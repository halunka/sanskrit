import { observable, computed, asReference, action } from 'mobx'
import uuid from 'uuid'

import { wrapText } from '../../utils/wrap-text'
import textField from '../fields/text'
import numberField from '../fields/number'

import type { TextField } from '../fields/text'
import type { NumberField } from '../fields/number'
import type { FPosition, FSize } from '../../utils'

export type ParagraphData = {
  text: TextField,
  fontSize: NumberField,
  lineHeight: NumberField,
}

export type Paragraph = {
  id: string,
  type: string,
  slot?: string,
  size: FSize,
  position: FPosition,
  data: ParagraphData,
  lines: Array<string>
}

export default (slot: string, data?: ParagraphData = {}): Paragraph => {
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
      text: textField(data.text || ''),
      fontSize: numberField(data.fontSize || 1, {
        update: action((newValue: number) => {
          const oldFontSize = paragraph.data.fontSize.value
          paragraph.data.fontSize.value = newValue
          paragraph.data.lineHeight.value = newValue - oldFontSize + paragraph.data.lineHeight.value
        })
      }),
      lineHeight: numberField(data.lineHeight || 1.2)
    },
    lines: computed(() => wrapText(
      paragraph.size.width,
      paragraph.data.fontSize.value,
      paragraph.data.text.value,
    ))
  })
  return paragraph
}
