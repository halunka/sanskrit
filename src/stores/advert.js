import { observable, computed, extendObservable, action } from 'mobx'
import R from 'ramda'

import { getViewBox } from '../utils'

import type { Template } from './template'
import type { Element } from './element'
import type { Position, FSize } from '../utils'

export type ElementParams<T> = {
  type: string,
  id: string,
  slot?: string,
  position: Position,
  size: FSize,
  data: T
}

export type Advert = {
  name: string,
  // TODO: this should be `template?`
  template: Template,
  // FIXME: `any` should be some generic
  elements: Array<Element<any>>,
  viewBox: string,
  sizeInPx: FSize,
  addElement: (element: ElementParams<any>) => Advert
}

export default (template: Template): Advert => {
  const advert = observable({
    name: '',
    template,
    elements: [],
    viewBox: computed(() =>
      advert.template
        ? getViewBox(advert.template)
        : undefined
    ),
    sizeInPx: computed(() => R.pipe(
      R.path(['template', 'size']),
      R.defaultTo(0),
      R.map(R.multiply(6))
    )(advert)),
    addElement: action(element => {
      advert.elements.push(element)
      /* if there's a position attribute missing */
      if (element.position.left === undefined || element.position.top === undefined) {
        /* float in the missing direction */
        const direction = element.position.left === undefined ? 'left' : 'top'
        const dimension = direction === 'top' ? 'height' : 'width'
        extendObservable(element.position, {
          // TODO: why is this used as a standalone observable in the code,
          // but correctly interpreted a normal computed property in the tests
          [direction]: computed(() => R.pipe(
            R.filter(R.propEq('slot', element.slot)),
            R.takeWhile(R.pipe(R.propEq('id', element.id), R.not)),
            R.reduce((m, e) => m + e.size[dimension], 0)
          )(advert.elements))
        })
      }
    })
  })
  template.slots.forEach((slot) => {
    extendObservable(slot, {
      elements: computed(() => advert.elements.filter(R.propEq('slot', slot.id)))
    })
  })
  return advert
}
