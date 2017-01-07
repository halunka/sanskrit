import { observable } from 'mobx'

export type TextField = {
  type: 'text',
  value: string
}

export default (value: string): TextField => observable({
  type: 'text',
  value
})
