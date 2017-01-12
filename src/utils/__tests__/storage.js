import test from 'ava'
import { save, load, observe } from '../storage'
import 'mock-local-storage'

test('save should store things in localStorage as JSON', t => {
  save('test1', { YOLO: true })
  t.is(localStorage.getItem('test1'), '{"YOLO":true}')
})

test('load should get values from localStorage and parse them as JSON', t => {
  localStorage.setItem('test2', '"YOLO"')
  t.is(load('test2'), 'YOLO')
})

// test.cb('observe should save from an observable in localStorage', t => {
//   t.plan(4)
//   return observe(
//     'test3',
//     O.merge(
//       O.of(1),
//       O.of(2),
//       O.of(3).delay(11),
//       O.of(4).delay(22),
//     ).do((x, i) => {
//       // after value has been stored
//       setTimeout(() => {
//         if (i === 0) t.is(localStorage.getItem('test3') === '1')
//         if (i === 1) t.is(localStorage.getItem('test3') === '1')
//         if (i === 2) t.is(localStorage.getItem('test3') === '3')
//         if (i === 3) {
//           t.is(localStorage.getItem('test3') === '4')
//           t.end()
//         }
//       })
//       return x
//     }),
//     10
//   )
// })
