import R from 'ramda'
import Hypher from 'hypher'
import germanDictionary from 'hyphenation.de'

import { createSvgElement, setSvgAttribute } from './dom'
import mkCache from './cache'

const hypher = new Hypher(germanDictionary)

export const isBoundary = (l: string) => !!l.match(/\W/)

export const splitWords = (text: string) =>
  text.split('').reduce(
    (words, letter, i, letters) =>
      // if the last letter was a boundary or this is the first letter
      (i === 0 || letter === '\n' || isBoundary(letters[i - 1]))
        // add a word
        ? words.concat(letter)
        // otherwise add it to the last word
        : R.update(words.length - 1, R.last(words) + letter, words),
    []
  )

const cache = mkCache(false, 600000)
let letterRenderNode: ?window.SVGElement = null
let letterRenderConvertionFactor: ?number = null
/*
 * Creates a text node inside an SVG node. That node is then used to measure
 * how wide a letter will be rendered. This in turn is used to calculate
 * text-wraps.
 */
// TODO: this newly created `letterRenderNode`
export const setRenderNode = (virtualWidth: number, pixelWidth: number) => (svgNode: window.SVGElement) => {
  if (letterRenderNode) letterRenderNode.parentNode.removeChild(letterRenderNode)
  letterRenderConvertionFactor = pixelWidth / virtualWidth

  letterRenderNode = createSvgElement('text')
  letterRenderNode.setAttribute('opacity', 0)
  svgNode.appendChild(letterRenderNode)
}

// TODO there are some other unicode chars that don't have a width
const isSpace = R.contains(R.__, [' '])

export const getLetterWidthByRendering = (fontFamily: string, fontSize: number, letter: string): number | false => {
  if (!letterRenderNode) return false
  letterRenderNode.setAttribute('font-family', fontFamily)
  letterRenderNode.setAttribute('style', `font-size: ${fontSize};`)
  letterRenderNode.textContent = isSpace(letter)
    ? `l${letter}l`
    : letter
  const virtualLetterWidth = letterRenderNode.getComputedTextLength()
  return isSpace(letter)
    ? virtualLetterWidth - (getLetterWidth(fontFamily, fontSize)('l') * 2)
    : virtualLetterWidth
}

const unrenderableLetters = []
const isLetterRenderable = (letter) => !unrenderableLetters.includes(letter)

export const getLetterWidth = (fontFamily: string, fontSize: number) => (letter: string): number => {
  const cacheKey = letter + fontSize + fontFamily
  const cachedValue = cache.get(cacheKey)
  if (cachedValue !== undefined && cachedValue !== false) return cachedValue
  const renderedWidth = isLetterRenderable(letter)
    ? getLetterWidthByRendering(fontFamily, fontSize, letter)
    : false
  cache.set(cacheKey, renderedWidth)
  if (renderedWidth !== false) cache.set(cacheKey, renderedWidth)
  return renderedWidth === false
    ? calculateLetterWidth(fontSize)
    : renderedWidth
}

const cutLastSpace = (word) =>
  isSpace(word.substr(-1))
    ? word.substr(0, word.length - 1)
    : word
export const getWordWidth = (fontFamily: string, fontSize: number) => (word, onLineEnd) =>
  R.pipe(
    R.split(''),
    R.map(getLetterWidth(fontFamily, fontSize)),
    R.reduce(R.add, 0)
  )(onLineEnd ? cutLastSpace(word) : word)

const calculateLetterWidth = (fontSize: number) => 0.8 * fontSize

export const silablesFitIn = (fontFamily: string, fontSize: number, silables: Array<string>, maxWidth: number) =>
  silables.reduce(
    ([left, right, width], silable) => {
      if (width >= maxWidth) return [left, right + silable, width]
      const newWidth = getWordWidth(fontFamily, fontSize)(silable) + width
      return newWidth > maxWidth
        /* return the maxWidth as the current `width` to prevent more silables beeing added */
        ? [left, right + silable, maxWidth]
        : [left.substr(0, left.length - 1) + silable + '-', right, newWidth]
    },
    ['', '', getLetterWidth(fontFamily, fontSize)('-')]
  )

export const wrapText = (maxLineWidth: number, fontFamily: string, fontSize: number, text: string): Array<string> => {
  const getWordWidthB = getWordWidth(fontFamily, fontSize)
  return splitWords(text)
    .reduce(
      (lines, word, i) => {
        if (
          i === 0 ||
          word === '\n' ||
          R.last(lines) === '\n'
        ) return lines.concat(word)

        const lineWidth = getWordWidthB(R.last(lines))
        if (getWordWidthB(word, true) + lineWidth > maxLineWidth) {
          const silables = hypher.hyphenate(word)
          const [ fittingSilablesWithHyphen, leftOverSilables ] =
            silablesFitIn(fontFamily, fontSize, silables, maxLineWidth - lineWidth)
          return R.update(
            lines.length - 1,
            R.last(lines) + fittingSilablesWithHyphen,
            lines.concat(leftOverSilables)
          )
        } else {
          return R.update(lines.length - 1, R.last(lines) + word, lines)
        }
      },
      []
    )
    .reduce(
      (lines, line, i, rawLines) =>
        line === '\n'
          ? rawLines[i + 1] === '\n'
            ? lines.concat(' ')
            : lines
          : lines.concat(line),
      []
    )
}
