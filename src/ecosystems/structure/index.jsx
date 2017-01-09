import { observer } from 'mobx-react'
import React from 'react'

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
    <h2>{i18n.t['structure.title']}:</h2>
    <figure className={styles.figure}>
      <figcaption>{ i18n.t[`templates.${advert.template.name}`] }</figcaption>
      {advert.template.slots.map((slot, i) => (
        <Sortable
          sort
          key={i}
          wrapperClass={styles.figure}
          wrapperElement='figure'
          element
          group={{ name: 'elements', pull: true, put: true }}
          onAdd={({ item }) => {
            /* get the `type` from `dataset` of the element that was dropped
             * into the slot and pass the slot id to the element factory with
             * that type. then open a wizard with that element
             */
            advert.newElementWizard(toolbox.elementFactories[item.dataset.type](slot.id))
            /* now remove the item node, since it's no longer needed */
            item.parentNode.removeChild(item)
          }}
          ghostClass='element-ghost'
        >
          {slot.elements.map((element, i) => (
            <figure className={`${styles.figure} ${styles.element}`} key={i}>
              <figcaption>{i18n.t[`elements.${element.type}`]}</figcaption>
            </figure>
          ))}
        </Sortable>
      ))}
    </figure>
  </section>
))
