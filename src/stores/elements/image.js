/*
 * @file image
 * Simplest possible implementation by simple base64 encoding the images.
 * It would be a lot better not to store the files as strings... but for now,
 * this is the most economical way to implement it.
 */
import uuid from 'uuid'

import mkElement from '../element'
import { computedFromField } from '../../utils'
import mkFileField from '../fields/file'

import type { ElementT } from '../element'
import type { FileFieldT } from '../fields/file'

type ImageData = {
  image: FileFieldT
}

type ImageDataParams = {
  image?: string
}

type ImageT = ElementT<ImageData> & {
  image: string,
  data: ImageData
}

const defaultValues: ImageData = {
  image: ''
}

export default function mkImage (slot: string, data?: ImageDataParams = {}, id?: string): ImageT {
  const image = mkElement(
    {
      type: 'image',
      id: id || uuid(),
      slot,
      size: {
        autoWidth: true,
        // TODO: should be computed somehow 😅
        height: 20
      },
      position: { left: 0 },
      data: {
        image: mkFileField(data.image)
      }
    },
    { image: computedFromField(defaultValues)('image') }
  )
  return image
}
