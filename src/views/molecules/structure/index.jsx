import { observer } from 'mobx-preact'
import { h } from 'preact'

import Sortable from '../../atoms/sortable'
import i18n from '../../../stores/i18n'
import styles from './styles.css'

import type { Advert } from '../../../stores/advert'
import type { ToolboxT } from '../../../stores/toolbox'

type Props = {
  advert: Advert,
  toolbox: ToolboxT
}

export default observer(function Structure ({ advert, toolbox }: Props) {
  return (
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
            ghostClass='element-ghost'
          >
            {slot.elements.map((element, i) => (
              <figure
                className={`${styles.figure} ${styles.element}`}
                data-id={element.id} key={i}
                onClick={() => advert.setWizard(element.id)}
                >
                <figcaption>{i18n.t[`elements.${element.type}`]}</figcaption>
                <button onClick={() => { advert.removeElement(element.id) }}>x</button>
              </figure>
            ))}
          </Sortable>
        ))}
      </figure>
    </section>
  )
})
