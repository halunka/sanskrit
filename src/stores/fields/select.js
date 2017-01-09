import R from 'ramda'

import field from '../field'

export type SelectField<V> = {
  type: 'select',
  value: V,
  data: { [string]: V },
  update: (newValue: V) => SelectField
}

type SelectFieldInput<V> = {
  data: { [string]: V },
  value?: V
}

export default <V>({ data, value }: SelectFieldInput<V>): SelectField<V> => field({
  data,
  type: 'text',
  value: value || R.head(data)
})

