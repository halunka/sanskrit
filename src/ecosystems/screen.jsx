import React from 'react'
import { observer } from 'mobx-react'

export default observer(({ advert }) => (
  <section>
    <svg viewBox={advert.viewBox}>
      { advert.elements.map((attributes) => <text>{ JSON.stringify(attributes) }</text>) }
    </svg>
  </section>
))
