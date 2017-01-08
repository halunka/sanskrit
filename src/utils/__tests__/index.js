// $FlowFixMe: definition doesn't contain `uuid()`
import test from 'ava'

import { getViewBox } from '../'

test('getViewBox should generate a valid viewBox attribute from an element', t => {
  t.is(getViewBox({ size: [10, 20], position: [1, 2] }), '1 2 10 20')
})
