/* @file Screen
 * The rendered preview of the advert.
 */
import { h } from 'preact'
import { observer } from 'mobx-preact'

import Text from '../../molecules/text'
import Image from '../../molecules/image'
import type { Advert } from '../../../stores/advert'
import { setRenderNode } from '../../../utils/wrap-text'

import styles from './styles'

type Props = {
  advert: Advert
}

const elementViews = {
  text: Text,
  image: Image
}

export default observer(function Screen ({ advert }: Props) {
  return (
    // Only render if there's a template
    <section className={styles.wrapper}>
      { advert.template !== undefined && (
        <svg
          className={styles.svg}
          width={advert.sizeInPx.width}
          height={advert.sizeInPx.height}
          ref={setRenderNode(advert.template.size.width, advert.sizeInPx.width)}
          viewBox={advert.viewBox}
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          >
          {advert.template.slots.map((slot) => (
            <svg
              key={slot.id}
              x={slot.position.left}
              y={slot.position.top}
              width={slot.size.width}
              height={slot.size.height}
              >
              {slot.elements.map((element, key) =>
                h(
                  elementViews[element.type],
                  { advert, element, key }
                )
              )}
            </svg>
          ))}
        </svg>
      )}
    </section>
  )
})
