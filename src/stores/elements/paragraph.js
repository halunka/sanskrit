import { observable, computed, asReference, action } from 'mobx'
import uuid from 'uuid'

import mkElement from '../element'
import { wrapText } from '../../utils/wrap-text'
import { getValueIfValid } from '../../utils'
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

  /* these three values are derived from `data`, unlike `data[*].value`, which
   * may contain any value what so ever, these values must always be
   * renderable. That way I don't have to check them inside the views.
   */
  text: string,
  fontSize: number,
  lineHeight: number,

  /* contains the input parameters of the paragraph */
  data: ParagraphData,
  lines: Array<string>
}

const defaultValues = {
  text: '',
  fontSize: 1,
  lineHeight: 1.2
}

export default (slot: string, data?: ParagraphData = {}): Paragraph => {
  const paragraph = mkElement(
    {
      id: uuid(),
      slot,
      type: 'paragraph',
      size: {
        autoWidth: true,
        height: computed(() => paragraph.lineHeight * paragraph.lines.length + paragraph.padding * 2)
      },
      position: { left: 0 },
      data: {
        text: textField(data.text || defaultValues.text),
        fontSize: numberField(data.fontSize || defaultValues.fontSize, {
          update: action((newValue: number) => {
            const oldFontSize = paragraph.fontSize
            paragraph.data.fontSize.value = newValue
            paragraph.data.lineHeight.value = newValue - oldFontSize + paragraph.lineHeight
          })
        }),
        lineHeight: numberField(data.lineHeight || defaultValues.lineHeight)
      }
    },
    {
      padding: 1,
      text: computed(() => getValueIfValid(paragraph.data.text, defaultValues.text)),
      fontSize: computed(() => getValueIfValid(paragraph.data.fontSize, defaultValues.fontSize)),
      lineHeight: computed(() => getValueIfValid(paragraph.data.lineHeight, defaultValues.lineHeight)),
      lines: computed(() => wrapText(
        paragraph.size.width,
        paragraph.fontSize,
        paragraph.text,
      ))
    }
  )
  return paragraph
}
