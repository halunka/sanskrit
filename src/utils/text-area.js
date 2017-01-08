import R from 'ramda'

export const isBoundary = (l: string) => !!l.match(/\W/)

export const splitWords = (text: string) =>
  text.split('').reduce(
    (words, letter, i, letters) =>
      // if the last letter was a boundary or this is the first letter
      (i === 0 || isBoundary(letters[i - 1]))
        // add a word
        ? words.concat(letter)
        // otherwise add it to the last word
        : R.update(words.length - 1, R.last(words) + letter, words),
    []
  )

// FIXME: this implementation is just a hack. there doesn't seem to be a good
// way of implementing this. But a very accurate way of implementing this,
// would be to render an aproximation of the first line into a hidden `text`
// node and add words to it until the node actually exceeds the given `size`.
// But this would be very inefficient. So there would have to be some kind of
// caching algorithm. For caching I'd need to use some key-value storage. The
// keys would almost certainly have to be whole words, because with single
// letters I wouldn't be able compensate wor ligatures. But with whole words
// I'd have to write a cache invalidation system. So yeah, that's shit too.
// I coould do it in two modes. while the user is writting text, the could be
// a preview mode, where I just use some magic number for letter width, like
// I'm doing now. Then when the user saves the text I'd actually calculate the
// accurate word wrap by the method described above (w/o caching).
export const wrapText = (width: number, fontSize: number, text: string) => {
  const letterSize = 0.42 / fontSize
  const lettersInALine = Math.round(width / letterSize)
  return splitWords(text).reduce(
    (lines, word, i) =>
      // if this is the first word
      i === 0 ||
      // or the last line would be longer than allowed if this word was appended
      // to it
      R.last(lines).length + word.length > lettersInALine
        // create a new line containing this word
        ? lines.concat(word)
        // otherwise append this word to the last line
        : R.update(lines.length - 1, R.last(lines) + word, lines),
    []
  )
}
