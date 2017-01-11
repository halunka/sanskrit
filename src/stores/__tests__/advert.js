import test from 'ava'
import uuid from 'uuid'

import mkAdvert from '../advert'
import mkToolbox from '../toolbox'
import mkElement from '../element'
import mkParagraph from '../elements/paragraph'

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

test('addElement should take use the container\'s dimenons if a size is `-1`', t => {
  const toolbox = mkToolbox()
  const advert = mkAdvert(toolbox.templates[0])
  advert.addElement(newElement({ size: { autoWidth: true, height: 1 }, slot: toolbox.templates[0].slots[0].id }))
  t.is(advert.elements[0].size.width, 50)
  advert.addElement(newElement({ size: { width: 1, autoHeight: true }, slot: toolbox.templates[0].slots[0].id }))
  t.is(advert.elements[1].size.height, 54)
})

test('sizeInPx should be an adverts size, as defined in the template, in pixels', t => {
  const toolbox = mkToolbox()
  const advert = mkAdvert(toolbox.templates[0])
  t.deepEqual(advert.sizeInPx, { width: 324, height: 348 })
})

test('valid should show wether or not all values in an adverts element are valid', t => {
  const toolbox = mkToolbox()
  const advert = mkAdvert(toolbox.templates[0])
  const paragraph = mkParagraph(toolbox.templates[0].slots[0].id)
  advert.addElement(paragraph)
  t.false(advert.valid)
  paragraph.data.fontSize.update('asdf')
  t.false(advert.valid)
  paragraph.data.fontSize.update(12)
  paragraph.data.text.update('asdf')
  t.true(advert.valid)
})
