import React from 'react'
import { observer } from 'mobx-react'

import Sortable from '../../atoms/sortable'
import i18n from '../../stores/i18n'
import styles from './styles'

import type { Advert } from '../../stores/advert'
import type { Toolbox } from '../../stores/toolbox'

type Props = {
  advert: Advert,
  toolbox: Toolbox
}

export default observer(({ advert, toolbox }: Props) => (
  <section>
    <h2>{i18n.t['toolbox.title']}:</h2>
    <Sortable
      group={{ name: 'toolbox', pull: 'clone', put: false }}
      sort={false}
      handle={styles.element}
      wrapperClass={styles.elementList}
      >
      {toolbox.elements.map((element, i) => (
        <li className={styles.element} key={i}>
          {i18n.t[`elements.${element.type}`]}
        </li>
      ))}
    </Sortable>
  </section>
))
