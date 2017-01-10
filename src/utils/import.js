import R from 'ramda'

import mkAdvert from '../stores/advert'
import mkField from '../stores/field'
import mkParagraph from '../stores/elements/paragraph'
import { withId } from './'

import type { Toolbox } from '../stores/toolbox'
import type { Advert } from '../stores/advert'

const elementFactories = {
  paragraph: mkParagraph
}

export default (jsonData: string, toolbox: Toolbox): Advert => {
  const data = JSON.parse(jsonData)
  const template = toolbox.templates.find(withId(data.template))
  const advert = mkAdvert(template)
  data.elements.forEach((elementInput) => {
    const factory = elementFactories[elementInput.type]
    const element = factory(elementInput.slot, elementInput.data)
    advert.addElement(element)
  })
  return advert
}
