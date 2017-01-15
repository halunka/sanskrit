import { h } from 'preact'
import { observer } from 'mobx-preact'
import R from 'ramda'

import i18n from '../../../stores/i18n'
import { catchEvent } from '../../../utils/dom'

import textField from '../../atoms/text-field'
import numberField from '../../atoms/number-field'
import selectField from '../../atoms/select-field'
import fileField from '../../atoms/file-field'

import type { Advert } from '../../../stores/advert'

import styles from './styles'

const fields = {
  text: textField,
  number: numberField,
  select: selectField,
  file: fileField
}

type Props = {
  advert: Advert
}

export default observer(function Wizard ({ advert }: Props) {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>{i18n.t['wizard.title']}</h2>
      <form onSubmit={catchEvent(advert.closeWizard)} className={styles.form}>
        {advert.wizardElement && R.pipe(
          R.mapObjIndexed((field, key) => (
            <fieldset key={key}>
              <label>label</label>
              {h(
                fields[field.type],
                field
              )}
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
        <button type='submit' className={styles.save}>
          {i18n.t['save']}
        </button>
      </form>
    </section>
  )
})
