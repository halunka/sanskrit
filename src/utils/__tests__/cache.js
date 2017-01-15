import test from 'ava'
import 'mock-local-storage'

import mkCache from '../cache'

test('mkCache should return a cache', t => {
  t.true(typeof mkCache() === 'object')
})

test('cache.set should save a cache object to localStorage, if the cache uses localStorage', t => {
  const cache = mkCache(true)
  cache.set('test1', 'yolo')
  t.is(localStorage.getItem('test1'), '{"value":"yolo","validUntil":false}')
})

test.cb('cache.get should return a set value if it hasn\'t expired', t => {
  const cache = mkCache(true, 100)
  cache.set('test2', 'yolo2')
  t.is(cache.get('test2'), 'yolo2')
  setTimeout(() => {
    t.is(cache.get('test2'), undefined)
    t.end()
  }, 101)
})
