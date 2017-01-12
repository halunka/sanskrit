import { h } from 'preact'
import { observer } from 'mobx-preact'

import type { ParagraphT } from '../../stores/elements/paragraph'
import type { Advert } from '../../stores/advert'

type Props = {
  element: ParagraphT,
  advert: Advert
}

export default observer(function Paragraph ({ advert, element }: Props) {
  return (
    <text>
      {element.lines.map((line, i) =>
        <tspan
          font-size={element.fontSize}
          x={element.position.left}
          y={element.position.top + element.lineHeight * (i + 1)}
          key={i}
          >
          {line}
        </tspan>
      )}
    </text>
  )
})
