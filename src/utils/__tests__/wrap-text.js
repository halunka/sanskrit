import test from 'ava'

import { splitWords, isBoundary, wrapText } from '../wrap-text'

test('isBoundary should return wether the given character is a boundary', t => {
  t.true(isBoundary(' '))
  t.true(isBoundary(','))
  t.true(isBoundary('-'))
  t.false(isBoundary('a'))
})

test('splitWords should split a text at every word boundary', t => {
  t.deepEqual(splitWords('adf b'), ['adf ', 'b'])
  t.deepEqual(splitWords('adf-b, asdf'), ['adf-', 'b,', ' ', 'asdf'])
})

test('wrapText should split text into lines that fit a given width', t => {
  t.deepEqual(wrapText(4.3, 1, 'aaaa aaa dfsdf dfs 804jief'), ['aaaa aaa ', 'dfsdf dfs ', '804jief'])
  t.deepEqual(wrapText(4.3, 2, 'aaaa aaa dfsdf dfs 804jief'), ['aaaa ', 'aaa ', 'dfsdf ', 'dfs ', '804jief'])
})
