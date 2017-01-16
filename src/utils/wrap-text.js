import R from 'ramda'

import { createSvgElement, setSvgAttribute } from './dom'
import mkCache from './cache'

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
  letterRenderNode.setAttribute('style', 'opacity: 0;')
  svgNode.appendChild(letterRenderNode)
}

export const getLetterWidthByRendering = (fontFamily: string, fontSize: number, letter: string): number | false => {
  if (!letterRenderNode) return false
  letterRenderNode.setAttribute('font-family', fontFamily)
  setSvgAttribute(letterRenderNode, 'font-size', fontSize)
  letterRenderNode.textContent = letter
  const virtualLetterWidth = letterRenderNode.getComputedTextLength() / letterRenderConvertionFactor
  return virtualLetterWidth
}

const unrenderableLetters = [' ']
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

export const getWordWidth = (fontFamily: string, fontSize: number) => (word) =>
  R.pipe(
    R.split(''),
    R.map(getLetterWidth(fontFamily, fontSize)),
    R.reduce(R.add, 0)
  )(word)

const calculateLetterWidth = (fontSize: number) => 0.6 * fontSize

export const wrapText = (maxLineWidth: number, fontFamily: string, fontSize: number, text: string): Array<string> => {
  const getWordWidthB = getWordWidth(fontFamily, fontSize)
  return splitWords(text)
    .reduce(
      (lines, word, i) =>
        i === 0 ||
        word === '\n' ||
        R.last(lines) === '\n' ||
        getWordWidthB(word) + getWordWidthB(R.last(lines)) > maxLineWidth
          ? lines.concat(word)
          : R.update(lines.length - 1, R.last(lines) + word, lines),
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
