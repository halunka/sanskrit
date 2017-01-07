import { observable, asReference } from 'mbox'

export type Field<T> = {
  type: string,
  value: T
}

export default <T>({ type, value }: Field<T>): Field<T> => observable({
  type: asReference(type),
  value
})
