import { observer } from 'mobx-preact'
import { h } from 'preact'

import Sortable from '../../atoms/sortable'
import i18n from '../../../stores/i18n'
import { catchEvent } from '../../../utils/dom'
import styles from './styles.css'

import type { Advert } from '../../../stores/advert'
import type { ToolboxT } from '../../../stores/toolbox'

type Props = {
  advert: Advert,
  toolbox: ToolboxT
}

export default observer(function Structure ({ advert, toolbox }: Props) {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.sectionTitle}>{i18n.t['structure.title']}</h2>
      <figure className={`${styles.template}`}>
        <figcaption className={styles.label}>{ i18n.t[`templates.${advert.template.name}`] }</figcaption>
        {advert.template.slots.map((slot, i) => (
          <Sortable
            sort
            key={i}
            wrapperClass={`${styles.figure} ${styles.slot}`}
            wrapperElement='figure'
            element
            group={{ name: 'elements', pull: true, put: true }}
            onAdd={({ item, newIndex }) => {
              /* get the `type` from `dataset` of the element that was dropped
               * into the slot and pass the slot id to the element factory with
               * that type. then open a wizard with that element
               */
              advert.newElementWizard(toolbox.elementFactories[item.dataset.type](slot.id), newIndex)
            }}
            onSort={({ item, newIndex }) => {
              advert.moveElement(item.dataset.id, newIndex)
            }}
            onRemove={({ item }) => {
              advert.removeElement(item.dataset.id)
            }}
          >
            {slot.elements.map((element, i) => (
              <figure
                className={`${styles.figure} ${styles.element}`}
                data-id={element.id} key={i}
                onClick={() => { advert.setWizard(element.id) }}
                >
                <figcaption className={styles.elementTitle}>
                  {i18n.t[`elements.${element.type}`]}
                </figcaption>
                <button
                  className={styles.delete}
                  onClick={catchEvent(() => { advert.removeElement(element.id) })}
                  >
                  ×
                </button>
              </figure>
            ))}
          </Sortable>
        ))}
      </figure>
    </section>
  )
})
