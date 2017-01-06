import React from 'react'
import { observer } from 'mobx-react'

export default observer(({ elements }) => (
  <section>
    { elements.map(({ name }) => <p>{ name }</p>) }
  </section>
))
