import R from 'ramda'

import type { Size, Position } from '../types/utils.js'

export const getViewBox = ({ position, size }: { position: Position, size: Size }) => {
  const left = R.path(['position', 'left'], position)
  const bottom = R.path(['position', 'bottom'], position)
  const width = R.path(['position', 'width'], size)
  const height = R.path(['position', 'height'], size)
  return `${left} ${bottom} ${width} ${height}`
}
