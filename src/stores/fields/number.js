import { observable } from 'mobx'

export type NumberField = {
  type: string,
  value: number
}

export default (value: number): NumberField => observable({
  type: 'number',
  value
})
