import R from 'ramda'

export const create = (type: string, otherProps: Object = {}) =>
  R.assoc('type', type, otherProps)

export const is = (type) => (err) => R.path(['type'], err) === type
