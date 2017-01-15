import { h } from 'preact'
import { observer } from 'mobx-preact'

import type { ImageT } from '../../stores/elements/image'

type Props = {
  element: ImageT
}

export default observer(function Image ({ element }: Props) {
  return (
    <image
      width={element.size.width}
      height={element.size.height - element.padding * 2}
      x={element.position.left}
      y={element.position.top + element.padding}
      href={element.image}
      />
  )
})
