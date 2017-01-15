import R from 'ramda'
import { computed } from 'mobx'

import type { Field } from '../stores/field'
import type { ElementA } from '../stores/element'

export type Position = {
  left?: number,
  top?: number
}

export type FPosition = {
  left: number,
  top: number
}

export type Size = {
  width?: number,
  height?: number,
  autoWidth?: boolean,
  autoHeight?: boolean
}

/* Size with all props */
export type FSize = {
  width: number,
  height: number
}

export const getViewBox = (element: { position: Position, size: Size }) => {
  const left = R.path(['position', 'left'], element) || 0
  const top = R.path(['position', 'top'], element) || 0
  const width = R.path(['size', 'width'], element)
  const height = R.path(['size', 'height'], element)
  return `${left} ${top} ${width} ${height}`
}

export const withId = (id: string) => R.propEq('id', id)

export const getValueIfValid = <T>(field: Field<T>, defaultValue: T) => field.valid
  ? field.value
  : defaultValue

export const computedFromField = (defaultValues: { [string]: any }) => (key: string) =>
  computed(function () { return getValueIfValid(this.data[key], defaultValues[key]) })
