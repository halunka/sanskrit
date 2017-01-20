import { h } from 'preact'
import { observer } from 'mobx-preact'

import { waitForParents } from '../../utils/dom'

import type { TextT } from '../../stores/elements/text'
import type { Advert } from '../../stores/advert'

type Props = {
  element: TextT,
  advert: Advert
}

export default observer(function Text ({ advert, element }: Props) {
  const { fontWeight, fontSize, fontFamily, lineHeight, position, hasRendered, lines } = element
  return (
    <text
      font-size={fontSize}
      font-family={fontFamily}
      font-weight={fontWeight}
      ref={waitForParents(hasRendered)}
      >
      {lines.map((line, i) =>
        <tspan
          x={position.left}
          y={position.top + lineHeight * (i + 1) - (lineHeight - fontSize) / 2}
          key={i}
          >
          {line}
        </tspan>
      )}
    </text>
  )
})
