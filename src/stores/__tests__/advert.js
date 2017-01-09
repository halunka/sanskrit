import test from 'ava'
import uuid from 'uuid'

import mkAdvert from '../advert'
import mkToolbox from '../toolbox'
import mkElement from '../element'

const newElement = (x) => mkElement(Object.assign({
  type: '',
  id: uuid(),
  size: { width: 1, height: 1 },
  position: { left: 0, top: 0 },
  data: {}
}, x))

test('addElement should add a computed property `position` if the passed element doesn\'t have one', t => {
  const toolbox = mkToolbox()
  const advert = mkAdvert(toolbox.templates[0])
  advert.addElement(newElement({ position: { top: 0 } }))
  advert.addElement(newElement({ position: { top: 0 } }))
  advert.addElement(newElement({ position: { top: 0 } }))
  t.is(advert.elements[0].position.left, 0)
  t.is(advert.elements[1].position.left, 1)
  t.is(advert.elements[2].position.left, 2)
})

test('addElement should also float from left to right', t => {
  const toolbox = mkToolbox()
  const advert = mkAdvert(toolbox.templates[0])
  advert.addElement(newElement({ position: { left: 0 } }))
  advert.addElement(newElement({ position: { left: 0 } }))
  advert.addElement(newElement({ position: { left: 0 } }))
  t.deepEqual(advert.elements[0].position.top, 0)
  t.deepEqual(advert.elements[1].position.top, 1)
  t.deepEqual(advert.elements[2].position.top, 2)
})

test('sizeInPx should be an adverts size, as defined in the template, in pixels', t => {
  const toolbox = mkToolbox()
  const advert = mkAdvert(toolbox.templates[0])
  t.deepEqual(advert.sizeInPx, { width: 324, height: 348 })
})
