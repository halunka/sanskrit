import field from '../field'

export type NumberField = {
  type: string,
  value: number,
  update: (newValue: number) => NumberField
}

export default (value: number): NumberField => field({
  value,
  type: 'number'
})
