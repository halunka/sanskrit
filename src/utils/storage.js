import R from 'ramda'
import { autorunAsync } from 'mobx'

export const save = (key: string, value: any): void =>
  localStorage.setItem(key, JSON.stringify(value))

export const load = (key: string): any =>
  JSON.parse(localStorage.getItem(key))

export const observe = (key, observable, delay = 5000, project = R.invoker('toJs')): void => {
  autorunAsync(() => {
    save(key, project(observable))
  }, delay)
}
