import React from 'react'
import { observer } from 'mobx-react'
import R from 'ramda'

import TextArea from '../atoms/text-area.jsx'

import type { Advert } from '../stores/advert'

type Props = {
  advert: Advert
}

export default observer(({ advert }: Props) => (
  // Only render if there's a template
  <section>
    { advert.template !== undefined && (
      <svg
        viewBox={advert.viewBox}
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        >
        {advert.template.slots.map((slot) => (
          <svg
            key={slot.id}
            x={slot.position[0]}
            y={slot.position[1]}
            width={slot.size[0]}
            height={slot.size[1]}
            >
            {advert.elements
              .filter(R.propEq('slot', slot.id))
              .map((attributes, i) => (
                // $FlowFixMe: the `children` prop somehow doesn't work
                <TextArea
                  position={[0, 0]}
                  size={slot.size}
                  key={i}
                  >
                  { JSON.stringify(attributes) }
                </TextArea>
              ))
            }
          </svg>
        ))}
      </svg>
    )}
  </section>
))
