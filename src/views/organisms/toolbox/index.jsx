import React from 'react'
import { observer } from 'mobx-react'
import R from 'ramda'

import Sortable from '../../atoms/sortable'
import i18n from '../../../stores/i18n'
import styles from './styles.css'

import type { Advert } from '../../../stores/advert'
import type { ToolboxT } from '../../../stores/toolbox'

type Props = {
  advert: Advert,
  toolbox: ToolboxT
}

export default observer(function Toolbox ({ advert, toolbox }: Props) {
  return (
    <section>
      <h2>{i18n.t['toolbox.title']}:</h2>
      <Sortable
        group={{ name: 'elements', pull: 'clone', put: false }}
        wrapperClass={styles.elementList}
        >
        {R.pipe(
          R.mapObjIndexed((f, type) => (
            <li className={styles.element} data-type={type} key={type}>
              {i18n.t[`elements.${type}`]}
            </li>
          )),
          R.values
        )(toolbox.elementFactories)}
      </Sortable>
    </section>
  )
})
