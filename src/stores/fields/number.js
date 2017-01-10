import field from '../field'

export type NumberField = {
  type: string,
  value: number,
  update: (newValue: number) => NumberField
}

export default (value: number, otherAttributes: Object): NumberField => field(Object.assign(
  {
    value,
    type: 'number'
  },
  otherAttributes
))
