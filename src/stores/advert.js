import { observable, computed } from 'mobx'
import R from 'ramda'

import { getViewBox } from '../utils'

import type { Template } from './template'
import type { Element } from './element'

export type Advert = {
  name: string,
  // TODO: this should be `template?`
  template: Template,
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
