import React from 'react'

import Screen from './ecosystems/screen.jsx'
import uiStore from './stores/ui'

export default function Application () {
  return (
    <Screen uiStore={uiStore()} />
  )
}
