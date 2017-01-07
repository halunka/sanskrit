import { observable, computed } from 'mobx'

import { getViewBox } from '../utils'

import type { Template } from './template'
import type { Element } from './element'

export type Advert = {
  name: string,
  template?: Template,
  elements: Array<Element>,
  viewBox: string
}

export default (template: Template): Advert => {
  const advert = observable({
    name: '',
    template,
    elements: [],
    viewBox: computed(() => getViewBox(advert.template))
  })
  return advert
}
