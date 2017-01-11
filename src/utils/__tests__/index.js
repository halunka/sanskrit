import test from 'ava'

import { getViewBox } from '../'

test('getViewBox should generate a valid viewBox attribute from an element', t => {
  t.is(getViewBox({ size: { width: 10, height: 20 }, position: { left: 1, top: 2 } }), '1 2 10 20')
})
