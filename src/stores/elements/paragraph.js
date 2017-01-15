import { computed, action, asReference } from 'mobx'
import uuid from 'uuid'

import mkElement from '../element'
import { wrapText } from '../../utils/wrap-text'
import { cutTo, computedFromField } from '../../utils'
import mkTextField from '../fields/text'
import mkNumberField from '../fields/number'
import mkSelectField from '../fields/select'

import type { TextFieldT } from '../fields/text'
import type { NumberFieldT } from '../fields/number'
import type { FPosition, FSize } from '../../utils'
import type { ElementT } from '../element'

type ParagraphData = {
  text: TextFieldT,
  fontSize: NumberFieldT,
  lineHeight: NumberFieldT,
}

export type ParagraphT = ElementT<ParagraphData> & {
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

type ParagraphDataParams = {
  text?: string,
  fontSize?: number,
  lineHeight?: number,
}

const defaultValues = {
  text: '',
  fontSize: 1,
  lineHeight: 1.2,
  fontFamily: 'Helvetica Neue'
}

const computedFromParagraph = computedFromField(defaultValues)

export default function mkParagraph (slot: string, data?: ParagraphDataParams = {}, id?: string): ParagraphT {
  const paragraph = mkElement(
    {
      id: id || uuid(),
      slot,
      type: 'paragraph',
      size: {
        autoWidth: true,
        height: computed(() => paragraph.lineHeight * paragraph.lines.length + paragraph.padding * 2)
      },
      position: { left: 0 },
      data: {
        text: mkTextField(data.text || defaultValues.text, { label: 'field.text' }),
        fontSize: mkNumberField(data.fontSize || defaultValues.fontSize, {
          update: action((newValue: number) => {
            const oldFontSize = paragraph.fontSize
            paragraph.data.fontSize.value = newValue
            paragraph.data.lineHeight.value = newValue - oldFontSize + paragraph.lineHeight
          }),
          label: 'field.fontSize'
        }),
        fontFamily: mkSelectField(
          {
            'Helvetica Neue': 'Helvetica Neue',
            'Times': 'Times'
          },
          defaultValues.fontFamily,
          { label: 'field.fontFamily' }
        ),
        lineHeight: mkNumberField(data.lineHeight || defaultValues.lineHeight, { label: 'field.lineHeight' })
      }
    },
    {
      padding: 1,
      rendered: false,
      text: computedFromParagraph('text'),
      fontSize: computedFromParagraph('fontSize'),
      lineHeight: computedFromParagraph('lineHeight'),
      fontFamily: computedFromParagraph('fontFamily'),
      lines: computed(() => {
        /* only calculate the real lines after the paragraph has been rendered */
        if (!paragraph.rendered) return []
        return wrapText(
          paragraph.size.width,
          paragraph.fontFamily,
          paragraph.fontSize,
          paragraph.text
        )
      }),
      hasRendered: asReference(() => {
        paragraph.rendered = true
      }),
      preview: computed(() => cutTo(paragraph.text))
    }
  )
  return paragraph
}
