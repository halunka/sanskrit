import Mobx, { observable, computed, extendObservable, action, transaction, asReference } from 'mobx'
import R from 'ramda'

import { getViewBox, withId } from '../utils'

import type { Template } from './template'
import type { ElementA } from './element'
import type { Position, FSize, Size } from '../utils'

export type ElementParams<T> = {
  type: string,
  id: string,
  slot?: string,
  position: Position,
  size: Size,
  data: T
}

export type Advert = {
  name: string,
  // TODO: this should be `template?`
  template: Template,
  elements: Array<ElementA>,
  /* wether to show a wizard and with what element (its id) */
  wizard: ?string,
  wizardElement: ?ElementA,
  viewBox: string,
  sizeInPx: FSize,
  valid: boolean,
  addElement: (element: ElementA, index?: number) => Advert,
  newElementWizard: (element: ElementA, index: number) => Advert,
  closeWizard: () => Advert,
  setWizard: (elementId: string) => () => Advert,
  moveElement: (elementId: string, newIndex: number) => ?Advert,
  removeElement: (elementId: string) => ?Advert,
  export: () => string
}

export default function mkAdvert (template: Template): Advert {
  const advert = observable({
    name: '',
    template,
    elements: [],
    wizard: null,
    wizardElement: computed(() => R.find(withId(advert.wizard), advert.elements)),
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
    valid: computed(() => R.all(
      R.prop('valid'),
      advert.elements
    )),
    addElement: action((element, index) => {
      if (index === undefined) {
        advert.elements.push(element)
      } else {
        advert.elements.splice(index, 0, element)
      }
      /* if a dimension is set to auto */
      if (element.size.autoWidth || element.size.autoHeight) {
        const dimensions = [
          ...(element.size.autoWidth ? ['width'] : []),
          ...(element.size.autoHeight ? ['height'] : [])
        ]
        /* create computed values for the automatic values */
        const newSizeProps = dimensions.reduce((m, dimension) =>
          R.assoc(dimension, computed(() => R.pipe(
            R.find(withId(element.slot)),
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
            R.takeWhile(R.pipe(withId(element.id), R.not)),
            R.reduce((m, e) => m + e.size[dimension], 0)
          )(advert.elements))
        })
      }
      return advert
    }),
    newElementWizard: action((element, index) => {
      advert.addElement(element, index)
      advert.wizard = element.id
      return advert
    }),
    closeWizard: action(() => {
      advert.wizard = null
      return advert
    }),
    setWizard: action((elementId) => {
      advert.wizard = elementId
      return advert
    }),
    moveElement: action((elementId, newIndex) => {
      const index = advert.elements.findIndex(withId(elementId))
      /* return false if there's no element with that ID */
      if (index === -1) return null
      /* otherwise move the element in the elements array */
      transaction(() => {
        const [ element ] = advert.elements.splice(index, 1)
        advert.elements.splice(newIndex, 0, element)
      })
      return advert
    }),
    removeElement: action((elementId) => {
      const index = advert.elements.findIndex(withId(elementId))
      if (index === -1) return null
      advert.elements.splice(index, 1)
    }),
    export: asReference(() => JSON.stringify({
      template: advert.template.id,
      wizard: advert.wizard,
      elements: R.map(R.pipe(
        Mobx.toJS,
        R.pick(['id', 'type', 'slot', 'data']),
        (element) => R.assoc('data', R.map(R.prop('value'), element.data), element)
      ), advert.elements)
    }))
  })
  template.slots.forEach((slot) => {
    extendObservable(slot, {
      elements: computed(() => advert.elements.filter(R.propEq('slot', slot.id)))
    })
  })
  return advert
}
