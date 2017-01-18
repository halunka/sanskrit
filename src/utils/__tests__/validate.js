import test from 'ava'

import { validateTruthy, validateNumber, combine, errorsToArray } from '../validate'

test('validateTruthy should return a string for falsy values', t => {
  t.true(typeof validateTruthy(false) === 'string')
  t.true(typeof validateTruthy('') === 'string')
  t.true(typeof validateTruthy(undefined) === 'string')
})

test('validateTruthy should return false for truthy values', t => {
  t.false(validateTruthy(true))
  t.false(validateTruthy('asdjfk'))
  t.false(validateTruthy(12))
  t.false(validateTruthy(0))
})

test('validateNumber should return an error for things that can\'t be parsed as numbers', t => {
  t.true(typeof validateNumber('asdf') === 'string')
  t.true(typeof validateNumber('') === 'string')
  t.true(typeof validateNumber('1') === 'string')
  t.true(typeof validateNumber('1.235') === 'string')
})

test('validateNumber should return false for parseble numbers', t => {
  t.false(validateNumber(1))
})

test('combine should return all errors given by the passed validators for a certain value', t => {
  t.deepEqual(combine(validateNumber, validateTruthy)(11), false)
  t.deepEqual(
    combine(validateNumber, validateTruthy)(''),
    [ 'errors.must-numeric', 'errors.must-exist' ]
  )
  t.deepEqual(
    combine(validateNumber, validateTruthy)('asdf'),
    [ 'errors.must-numeric' ]
  )
})

test('errorsToArray should take any `ValidatorResult` and convert it to an array', t => {
  t.deepEqual(errorsToArray(false), [])
  t.deepEqual(errorsToArray([]), [])
  t.deepEqual(errorsToArray(['a', 'b']), ['a', 'b'])
  t.deepEqual(errorsToArray('a'), ['a'])
})
