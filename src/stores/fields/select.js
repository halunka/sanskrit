import { observable, computed } from 'mobx'

export type SelectField<K, V> = {
  type: 'select',
  value: V,
  input?: K,
  options: { [K]: V } | Array<V>
}

type SelectFieldInput<K, V> = {
  options: { [K]: V } | Array<V>,
  input?: K
}

export default <K, V>({ options, input }: SelectFieldInput<K, V>): SelectField<K, V> => {
  const selectField = observable({
    options,
    input,
    type: 'text',
    value: computed(() => selectField.options[selectField.input])
  })
  return selectField
}

