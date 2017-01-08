import React from 'react'

import { wrapText } from '../utils/text-area.js'

import type { FSize, Position } from '../utils'

type Props = {
  size: FSize,
  position: Position,
  lineHeight?: number,
  fontSize?: number,
  children: string
}

export default ({
  size,
  position,
  children,
  lineHeight = 1.2,
  fontSize = 1
}: Props) => (
  <text
    fontSize={fontSize}
    >
    {wrapText(size[0], fontSize, children).map((line, i) =>
      <tspan
        x={position[0]}
        y={position[1] + lineHeight * (i + 1)}
        key={i}
        >
        {line}
      </tspan>
    )}
  </text>
)
