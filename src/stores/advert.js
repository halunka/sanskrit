import { observable, computed } from 'mobx'

import { getViewBox } from '../utils'

import type { Template } from './template'
import type { Element } from './element'

export type Advert = {
  name: string,
  template?: Template,
  // FIXME: `any` should be some generic
  elements: Array<Element<any>>,
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
