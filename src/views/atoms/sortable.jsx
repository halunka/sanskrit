import { h, Component } from 'preact'
import SortableClass from 'sortablejs'
import R from 'ramda'

type Props = {
  wrapperClass: string,
  wrapperElement?: string,
  wrapperProps?: Object,
  group: { name: string, pull: boolean | string, put: boolean | string },
  sort?: boolean,
  sort?: boolean,
  ghostClass?: string,
  onAdd?: (item: window.HTMLElement, newIndex: number) => any,
  onSort?: (item: window.HTMLElement, newIndex: number) => any,
  onRemove?: (item: window.HTMLElement) => any
}

class Sortable extends Component {
  props: Props

  initializeSortable (options) {
    return (listRef) => new SortableClass(listRef, options)
  }

  render () {
    const props = this.props
    const options = R.omit(['children', 'wrapperClass', 'wrapperElement', 'wrapperProps'], props)
    return h(
      props.wrapperElement || 'ul',
      Object.assign(
        { className: props.wrapperClass, ref: this.initializeSortable(options) },
        props.wrapperProps || {}
      ),
      props.children
    )
  }
}

export default Sortable
