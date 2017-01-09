import R from 'ramda'

export const catchEvent = (cb) => (e) => {
  e.preventDefault()
  cb(e)
  return false
}

export const getValueFromEvent = R.path(['target', 'value'])
export const withValueFromEvent = (fn) => R.pipe(getValueFromEvent, fn)
