import R from 'ramda'

export type ValidatorResult = Array<string> | string | false
export type Validator = (v: any) => ValidatorResult

export const validateTruthy: Validator = R.cond([
  /* return false if the value is truthy */
  [v => v === 0 || v, R.F],
  [R.T, R.always('errors.must-exist')]
])

export const validateNumber: Validator = R.cond([
  [R.is(Number), R.F],
  [R.T, R.always('errors.must-numeric')]
])

export const combine = (...validators: Array<Validator>) => (value: any): ValidatorResult => {
  const errors = R.reduce((m, validator) => {
    const errors = validator(value)
    return errors
      ? m.concat(errors)
      : m
  }, [], validators)
  return errors.length > 0
    ? errors
    : false
}

export const errorsToArray = (errors: Array<string> | string | false) =>
  errors
    ? R.is(Array, errors)
      ? errors
      : [errors]
    : []
