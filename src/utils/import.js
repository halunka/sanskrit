import R from 'ramda'

import mkAdvert from '../stores/advert'
import mkParagraph from '../stores/elements/paragraph'
import { withId } from './'

import type { ToolboxT } from '../stores/toolbox'
import type { Advert } from '../stores/advert'

const elementFactories = {
  paragraph: mkParagraph
}

export default (jsonData: string, toolbox: ToolboxT): Advert => {
  const data = JSON.parse(jsonData)
  const template = toolbox.templates.find(withId(data.template))
  if (!template) throw new Error('Invalid template id')

  const advert = mkAdvert(template, data.wizard)
  data.elements.forEach((elementInput) => {
    const factory = elementFactories[elementInput.type]
    const element = factory(elementInput.slot, elementInput.data, elementInput.id)
    advert.addElement(element)
  })
  return advert
}
