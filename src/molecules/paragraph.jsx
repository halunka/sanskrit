import React from 'react'
import { observer } from 'mobx-react'

import type { Paragraph } from '../stores/elements/paragraph'
import type { Advert } from '../stores/advert'

type Props = {
  element: Paragraph,
  advert: Advert
}

export default observer(({ advert, element }: Props) => (
  <text
    fontSize={element.data.fontSize.value}
    >
    {element.lines.map((line, i) =>
      <tspan
        x={element.position.left}
        y={element.position.top + element.data.lineHeight.value * (i + 1)}
        key={i}
        >
        {line}
      </tspan>
    )}
  </text>
))
