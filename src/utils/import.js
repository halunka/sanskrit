import mkAdvert from '../stores/advert'
import mkParagraph from '../stores/elements/paragraph'
import mkImage from '../stores/elements/image'
import { withId } from './'

import type { ToolboxT } from '../stores/toolbox'
import type { Advert } from '../stores/advert'

const elementFactories = {
  paragraph: mkParagraph,
  image: mkImage
}

export default (jsonData: string, toolbox: ToolboxT): Advert => {
  const data = jsonData
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
