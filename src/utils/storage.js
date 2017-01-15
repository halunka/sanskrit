import R from 'ramda'
import { autorunAsync } from 'mobx'

export const save = (key: string, value: any): void =>
  localStorage.setItem(key, JSON.stringify(value))

export const load = (key: string): any => {
  const item = localStorage.getItem(key)
  return item
    ? JSON.parse(localStorage.getItem(key))
    : undefined
}

export const observe = (key, observable, delay = 5000, project = R.invoker('toJs')): void => {
  autorunAsync(() => {
    save(key, project(observable))
  }, delay)
}
