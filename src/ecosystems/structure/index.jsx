import { observer } from 'mobx-react'
import React from 'react'

import i18n from '../../stores/i18n'
import styles from './styles'

import type { Advert } from '../../stores/advert'

type Props = {
  advert: Advert
}

export default observer(({ advert }: Props) => (
  <section>
    <h2>{i18n.t['structure.title']}:</h2>
    <figure className={styles.figure}>
      <figcaption>{ i18n.t[`templates.${advert.template.name}`] }</figcaption>
      {advert.template.slots.map((slot, i) => (
        <figure className={styles.figure} key={i}>
          {slot.elements.map((element, i) => (
            <figure className={styles.figure} key={i}>
              <figcaption>{i18n.t[`elements.${element.type}`]}</figcaption>
            </figure>
          ))}
        </figure>
      ))}
    </figure>
  </section>
))
