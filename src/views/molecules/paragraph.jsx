import { h } from 'preact'
import { observer } from 'mobx-preact'

import { waitForParents } from '../../utils/dom'

import type { ParagraphT } from '../../stores/elements/paragraph'
import type { Advert } from '../../stores/advert'

type Props = {
  element: ParagraphT,
  advert: Advert
}

export default observer(function Paragraph ({ advert, element }: Props) {
  return (
    <text
      font-size={element.fontSize}
      font-family={element.fontFamily}
      ref={waitForParents(element.hasRendered)}
      >
      {element.lines.map((line, i) =>
        <tspan
          x={element.position.left}
          y={element.position.top + element.lineHeight * (i + 1) - (element.lineHeight / 2)}
          key={i}
          >
          {line}
        </tspan>
      )}
    </text>
  )
})
