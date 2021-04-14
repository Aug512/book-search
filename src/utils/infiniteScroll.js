import { setOffset } from '../store/actionCreators'
import store from '../store/store'

const addInfScroll = () => {
  let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom
  if (windowRelativeBottom < document.documentElement.clientHeight + 1) {
    const currentOffset = store.getState().offset
    const limit = store.getState().limit

    store.dispatch(setOffset(currentOffset + limit))
    document.removeEventListener('scroll', addInfScroll)
  }
}

export default addInfScroll
