import { observable, asReference, action } from 'mobx'

export type Field<T> = {
  type: string,
  value: T,
  /* data may be used for arbitrary metadata of the field */
  data?: any,
  update: (newValue: T) => Field<T>
}

export default <T>(field: Field<T>): Field<T> => {
  const fieldElement = observable(Object.assign(
    { update: action((newValue: T) => { fieldElement.value = newValue }) },
    field,
    { type: asReference(field.type) }
  ))
  return fieldElement
}
