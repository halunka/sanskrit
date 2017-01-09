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
  /* wether to show a wizard and with what element (its id) */
  wizard: ?string,
  viewBox: string,
  sizeInPx: FSize,
  addElement: (element: ElementParams<any>) => Advert,
  newElementWizard: (element: Element<any>) => Advert,
  closeWizard: () => Advert
}

export default (template: Template): Advert => {
  const advert = observable({
    name: '',
    template,
    elements: [],
    wizard: null,
    wizardElement: computed(() =>
      R.find(R.propEq('id', advert.wizard), advert.elements)
    ),
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
      /* if a dimension is set to auto */
      if (element.size.autoWidth || element.size.autoHeight) {
        const dimensions = [
          ...(element.size.autoWidth ? ['width'] : []),
          ...(element.size.autoHeight ? ['height'] : [])
        ]
        /* create computed values for the automatic values */
        const newSizeProps = dimensions.reduce((m, dimension) =>
          R.assoc(dimension, computed(() => R.pipe(
            R.find(R.propEq('id', element.slot)),
            R.path(['size', dimension])
          )(advert.template.slots)), m),
        {})
        /* extend the size with these automatic values */
        extendObservable(element.size, newSizeProps)
      }
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
      return advert
    }),
    newElementWizard: action((element: Element) => {
      advert.addElement(element)
      advert.wizard = element.id
      return advert
    }),
    closeWizard: action(() => {
      advert.wizard = null
    })
  })
  template.slots.forEach((slot) => {
    extendObservable(slot, {
      elements: computed(() => advert.elements.filter(R.propEq('slot', slot.id)))
    })
  })
  return advert
}
