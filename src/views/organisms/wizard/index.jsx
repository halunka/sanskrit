import React from 'react'
import { observer } from 'mobx-react'
import R from 'ramda'

import i18n from '../../../stores/i18n'
import { catchEvent } from '../../../utils/dom'

import textField from '../../atoms/text-field'
import numberField from '../../atoms/number-field'
import selectField from '../../atoms/select-field'

import type { Advert } from '../../../stores/advert'

const fields = {
  text: textField,
  number: numberField,
  select: selectField
}

type Props = {
  advert: Advert
}

export default observer(function Wizard ({ advert }: Props) {
  return (
    <form onSubmit={catchEvent(advert.closeWizard)}>
      <h2>{i18n.t['wizard.title']}</h2>
      {advert.wizardElement && R.pipe(
        R.mapObjIndexed((field, key) => (
          <fieldset key={key}>
            {
              React.createElement(
                fields[field.type],
                field
              )
            }
            {field.errors.length > 0 && (
              <ul>
                {field.errors.map((error, i) => (
                  <li key={i}>{i18n.t[error]}</li>
                ))}
              </ul>
            )}
          </fieldset>
        )),
        R.values
      // $FlowFixMe: undefined is checked above
      )(advert.wizardElement.data)}
      <button type='submit'>{i18n.t['save']}</button>
    </form>
  )
})
