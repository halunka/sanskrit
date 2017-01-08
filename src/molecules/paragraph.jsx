import React from 'react'

import type { Paragraph } from '../stores/elements/paragraph'
import type { FSize, FPosition } from '../utils'

type Props = { element: Paragraph }

export default ({ element }: Props) => (
  <text
    fontSize={element.data.fontSize.value}
    >
    {element.lines.map((line, i) =>
      <tspan
        x={element.position[0]}
        y={element.position[1] + element.data.lineHeight.value * (i + 1)}
        key={i}
        >
        {line}
      </tspan>
    )}
  </text>
)
