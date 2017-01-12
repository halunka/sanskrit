import R from 'ramda'

export const catchEvent = (fn: (e: window.Event) => any) => (e: window.Event) => {
  e.preventDefault()
  fn(e)
  return false
}

export const getValueFromEvent = R.path(['target', 'value'])
export const withValueFromEvent = (fn: (value: string) => any) => R.pipe(getValueFromEvent, fn)
