import R from 'ramda'

export const catchEvent = (fn: (e: window.Event) => any) => (e: window.Event) => {
  e.preventDefault()
  fn(e)
  return false
}

export const getValueFromEvent = R.path(['target', 'value'])
export const withValueFromEvent = (fn: (value: string) => any) => R.pipe(getValueFromEvent, fn)

const SVG_NS = 'http://www.w3.org/2000/svg'

export const createSvgElement = (type: string) =>
  document.createElementNS(SVG_NS, type)
export const setSvgAttribute = (node: window.SVGElement, attribute: string, value: any) =>
  node.setAttributeNS(SVG_NS, attribute, value)

export const waitForParents = (fn: (ref: window.Node) => any) => (ref: window.Node) => {
  // FIXME: I don't think this is 100% reliable
  setTimeout(() => {
    fn(ref)
  })
}

export const getFilesFromEvent = (fn: (fileName: string, file: string | false) => any) =>
  catchEvent((e: window.InputEvent) => {
    const file = e.target.files[0]
    if (!file) return false
    const reader = new window.FileReader()
    reader.addEventListener('load', (e) => {
      fn({ name: file.name, content: e.target.result })
    })
    reader.readAsDataURL(file)
  })

export const getLanguageFromNavigator = () =>
  (R.path(['navigator', 'language'], window) || '').split('-')[0]
