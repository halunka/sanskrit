import { observable, asReference, action } from 'mobx'

export type Field<T> = {
  type: string,
  value: T,
  /* data may be used for arbitrary metadata of the field */
  data?: any,
  update: (newValue: T) => Field<T>
}

export default <T>({ type, value, data }: Field<T>): Field<T> => {
  const field = observable({
    type: asReference(type),
    update: action((newValue: T) => { field.value = newValue }),
    value,
    data
  })
  return field
}
