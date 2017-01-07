import { observable, asReference } from 'mobx'

export type Field<T> = {
  type: string,
  value: T
}

export default <T>({ type, value }: Field<T>): Field<T> => observable({
  type: asReference(type),
  value
})
