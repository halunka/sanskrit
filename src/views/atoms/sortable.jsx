import React, { Component } from 'react'
import SortableClass from 'sortablejs'
import R from 'ramda'

type Props = {
  wrapperClass: string,
  wrapperElement?: string,
  wrapperProps?: string,
  sort: boolean,
  handle: string,
  group: { name: string, pull: boolean | string, put: boolean | string },
}

class Sortable extends Component {
  props: Props

  componentDidMount () {
    const options = R.omit(['children', 'wrapperClass', 'wrapperElement', 'wrapperProps'], this.props)
    this.sortable = new SortableClass(this.refs.list, options)
  }

  render () {
    const {
      wrapperClass,
      wrapperElement = 'ul',
      wrapperProps = {},
      children
    } = this.props

    return (
      React.createElement(
        wrapperElement,
        Object.assign({ className: wrapperClass, ref: 'list' }, wrapperProps),
        children
      )
    )
  }
}

export default Sortable
