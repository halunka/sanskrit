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

test('removeElement should remove an element by id', t => {
  const toolbox = mkToolbox()
  const advert = mkAdvert(toolbox.templates[0])
  advert.addElement(newElement())
  const id = advert.elements[0].id
  advert.removeElement(id)
  t.true(advert.elements.length === 0)
})

test('moveElement should move an element', t => {
  const toolbox = mkToolbox()
  const advert = mkAdvert(toolbox.templates[0])
  const element0 = newElement()
  const element1 = newElement()
  advert.addElement(element0)
  advert.addElement(element1)
  advert.moveElement(element0.id, 1)
  t.is(advert.elements[0].id, element1.id)
  t.is(advert.elements[1].id, element0.id)
})

test('setWizard should open the wizard with a given element', t => {
  const toolbox = mkToolbox()
  const advert = mkAdvert(toolbox.templates[0])
  advert.addElement(newElement())
  advert.setWizard(advert.elements[0].id)
  t.is(advert.wizard, advert.elements[0].id)
})

test('newElementWizard should open the wizard and add a new element', t => {
  const toolbox = mkToolbox()
  const advert = mkAdvert(toolbox.templates[0])
  const element = newElement()
  advert.newElementWizard(element)
  t.is(advert.wizard, element.id)
  t.is(advert.elements[0].id, element.id)
})

test('closeWizard should close the wizard', t => {
  const toolbox = mkToolbox()
  const advert = mkAdvert(toolbox.templates[0])
  advert.addElement(newElement())
  advert.setWizard(advert.elements[0].id)
  advert.closeWizard()
  t.is(advert.wizard, null)
})

test('wizardElement should be the element with the id of `wizard`', t => {
  const toolbox = mkToolbox()
  const advert = mkAdvert(toolbox.templates[0])
  advert.addElement(newElement())
  advert.setWizard(advert.elements[0].id)
  t.is(advert.wizardElement.id, advert.elements[0].id)
})

test('export should return valid JSON', t => {
  const toolbox = mkToolbox()
  const advert = mkAdvert(toolbox.templates[0])
  t.true(typeof JSON.parse(advert.export()) === 'object')
})

test('export should contain all exportable attributes', t => {
  const toolbox = mkToolbox()
  const advert = mkAdvert(toolbox.templates[0])
  advert.addElement(mkParagraph(advert.template.slots[0].id))
  advert.addElement(mkParagraph(advert.template.slots[0].id))
  advert.setWizard(advert.elements[0].id)
  t.deepEqual(JSON.parse(advert.export()), {
    template: advert.template.id,
    wizard: advert.wizard,
    elements: [
      {
        id: advert.elements[0].id,
        type: advert.elements[0].type,
        slot: advert.elements[0].slot,
        data: {
          text: advert.elements[0].text,
          fontSize: advert.elements[0].fontSize,
          lineHeight: advert.elements[0].lineHeight
        }
      },
      {
        id: advert.elements[1].id,
        type: advert.elements[1].type,
        slot: advert.elements[1].slot,
        data: {
          text: advert.elements[1].text,
          fontSize: advert.elements[1].fontSize,
          lineHeight: advert.elements[1].lineHeight
        }
      }
    ]
  })
})

test('sizeInPx should be an adverts size, as defined in the template, in pixels', t => {
  const toolbox = mkToolbox()
  const advert = mkAdvert(toolbox.templates[0])
  t.deepEqual(advert.sizeInPx, { width: 324, height: 348 })
})

test('viewBox should be an adverts SVG viewbox dimensions', t => {
  const toolbox = mkToolbox()
  const advert = mkAdvert(toolbox.templates[0])
  t.deepEqual(advert.viewBox, '0 0 54 58')
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
