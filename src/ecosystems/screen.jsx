import React from 'react'
import { observer } from 'mobx-react'

import TextArea from '../atoms/text-area.jsx'

import type { Advert } from '../stores/advert'

type Props = {
  advert: Advert
}

export default observer(({ advert }: Props) => (
  // Only render if there's a template
  <section>
    { advert.template && (
      <svg
        viewBox={advert.viewBox}
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        >
        {
          advert.elements.map((attributes, i) => (
            // $FlowFixMe: the `children` prop somehow doesn't work
            <TextArea
              position={[0, 0]}
              size={advert.template.size}
              key={i}
              >
              { JSON.stringify(attributes) }
            </TextArea>
          ))
        }
      </svg>
    )}
  </section>
))
