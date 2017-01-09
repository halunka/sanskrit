import field from '../field'

export type TextField = {
  type: 'text',
  value: string
}

export default (value: string): TextField => field({
  type: 'text',
  value
})
