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

type TextData = {
  text: TextFieldT,
  fontSize: NumberFieldT,
  lineHeight: NumberFieldT,
}

export type TextT = ElementT<TextData> & {
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

  /* contains the input parameters of the text */
  data: TextData,
  lines: Array<string>
}

type TextDataParams = {
  text?: string,
  fontSize?: number,
  lineHeight?: number,
}

const defaultValues = {
  text: '',
  fontSize: 1,
  lineHeight: 1.2,
  fontFamily: 'Helvetica Neue',
  fontWeight: '400'
}

const computedFromText = computedFromField(defaultValues)

export default function mkText (slot: string, data?: TextDataParams = {}, id?: string): TextT {
  const text = mkElement(
    {
      id: id || uuid(),
      slot,
      type: 'text',
      size: {
        autoWidth: true,
        height: computed(() => text.lineHeight * text.lines.length + text.padding * 2)
      },
      position: { left: 0 },
      data: {
        text: mkTextField(data.text || defaultValues.text, { label: 'field.text' }),
        fontSize: mkNumberField(data.fontSize || defaultValues.fontSize, {
          update: action((newValue: number) => {
            const oldFontSize = text.fontSize
            text.data.fontSize.value = newValue
            /* Line height should be 120% of the font size by default */
            text.data.lineHeight.value =
              (newValue - oldFontSize) * 1.2 + (text.data.lineHeight.value || 1)
          }),
          label: 'field.fontSize'
        }),
        fontFamily: mkSelectField(
          {
            'Helvetica Neue': 'Helvetica Neue',
            'Times': 'Times'
          },
          data.fontFamily || defaultValues.fontFamily,
          { label: 'field.fontFamily' }
        ),
        fontWeight: mkSelectField(
          {
            'light': '300',
            'medium': '400',
            'bold': '600'
          },
          data.fontWeight || defaultValues.fontWeight,
          { label: 'field.fontWeight' }
        ),
        lineHeight: mkNumberField(data.lineHeight, { label: 'field.lineHeight' })
      }
    },
    {
      padding: 1,
      rendered: false,
      text: computedFromText('text'),
      fontSize: computedFromText('fontSize'),
      lineHeight: computedFromText('lineHeight'),
      fontFamily: computedFromText('fontFamily'),
      fontWeight: computedFromText('fontWeight'),
      lines: computed(() => {
        /* only calculate the real lines after the text has been rendered */
        if (!text.rendered) return []
        return wrapText(
          text.size.width,
          text.fontFamily,
          text.fontSize,
          text.text
        )
      }),
      hasRendered: asReference(() => {
        text.rendered = true
      }),
      preview: computed(() => cutTo(text.text))
    }
  )
  return text
}
