import R from 'ramda'

export type Position = {
  left?: number,
  top?: number
}

export type FPosition = {|
  left: number,
  top: number
|}

export type Size = {
  width?: number,
  height?: number,
  autoWidth?: boolean,
  autoHeight?: boolean
}

/* Size with all props */
export type FSize = {|
  width: number,
  height: number
|}

export const getViewBox = (element: { position: Position, size: Size }) => {
  const left = R.path(['position', 'left'], element) || 0
  const top = R.path(['position', 'top'], element) || 0
  const width = R.path(['size', 'width'], element)
  const height = R.path(['size', 'height'], element)
  return `${left} ${top} ${width} ${height}`
}

export const withId = id => R.propEq('id', id)
