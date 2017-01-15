import { observable, asReference, action, computed } from 'mobx'

import { errorsToArray } from '../utils/validate'

export type Field<T> = {
  type: string,
  value?: T,
  /* data may be used for arbitrary metadata of the field */
  data?: any,
  errors: Array<string>,
  valid: boolean,
  update: (newValue: T) => Field<T>,
  validate?: (value: T) => string | Array<string> | false
}

type FieldParams<T> = {
  type: string,
  value?: T,
  data?: any,
  valid?: boolean,
  update?: (newValue: T) => Field<T>,
  validate?: (value: T) => string | Array<string> | false
}

export default function mkField <T> (field: FieldParams<T>): Field<T> {
  // $FlowFixMe
  const fieldElement = observable(Object.assign(
    {
      update: action((newValue: T) => {
        const errors = fieldElement.validate && fieldElement.validate(newValue)
        fieldElement.errors.replace(errorsToArray(errors))
        fieldElement.value = newValue
        return fieldElement
      }),
      errors: [],
      valid: computed(() => !fieldElement.validate(fieldElement.value))
    },
    field,
    {
      type: asReference(field.type),
      validate: asReference(field.validate)
    }
  ))
  return fieldElement
}
