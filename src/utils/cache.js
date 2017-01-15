import { save, load } from './storage'
import R from 'ramda'

export default (useLocalStorage?: boolean, ttl?: number | false = false) => {
  const inMemoryCache: { [string]: any } = {}
  const cleanup = cacheCleaner(useLocalStorage, ttl, inMemoryCache)
  const cache = {
    set: (key, value) => {
      cleanup()
      const cacheObject = generateCacheObject(ttl, value)
      inMemoryCache[key] = cacheObject
      if (useLocalStorage) save(key, cacheObject)
      return cacheObject
    },
    get: (key) => {
      cleanup()
      const cacheObject = inMemoryCache.hasOwnProperty(key)
        ? inMemoryCache[key]
        : useLocalStorage && load(key)
      const value = R.path(['value'], cacheObject)
      /* refresh validUntil */
      if (value) cache.set(key, value)
      return value
    },
    cleanup: () => { cleanup() }
  }
  return cache
}

const cacheCleaner = (useLocalStorage: boolean, ttl: number | false, inMemoryCache: { [string]: any }) => () => {
  if (ttl === false) return
  Object.keys(inMemoryCache).forEach((key) => {
    const validUntil = R.path([key, 'validUntil'], inMemoryCache)
    if (!validUntil || validUntil > Date.now()) return
    delete inMemoryCache[key]
    if (useLocalStorage) localStorage.removeItem(key)
  })
}

const generateCacheObject = (ttl, value) => ({
  value,
  validUntil: ttl === false
    ? false
    : Date.now() + ttl
})
