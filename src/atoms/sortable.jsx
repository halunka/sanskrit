import React, { Component } from 'react'
import SortableClass from 'sortablejs'
import R from 'ramda'

type Props = {
  wrapperClass: string,
  sort: boolean,
  handle: string,
  group: { name: string, pull: boolean | string, put: boolean | string },
}

class Sortable extends Component {
  constructor (props: Props) {
    super(props)
  }
  componentDidMount () {
    this.sortable = new SortableClass(this.refs.list, R.drop(['children', 'wrapperClass'], this.props))
  }

  render () {
    return (
      <ul className={this.props.wrapperClass} ref='list'>
        {this.props.children}
      </ul>
    )
  }
}

export default Sortable
