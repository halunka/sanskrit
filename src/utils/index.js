import R from 'ramda'

export type Position = [
  ?number, // left
  ?number // top
]

export type Size = [
  ?number, // width
  ?number // height
]

/* Size with all props */
export type FSize = [
  number, // width
  number // height
]

export const getViewBox = (element: { position: Position, size: Size }) => {
  const left = R.path(['position', 0], element) || 0
  const bottom = R.path(['position', 1], element) || 0
  const width = R.path(['size', 0], element)
  const height = R.path(['size', 1], element)
  return `${left} ${bottom} ${width} ${height}`
}
