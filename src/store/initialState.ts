import { storeInterface } from './types'

const initialState: storeInterface = {
  offset: 0,
  limit: 10,
  books: [],
  showLoader: false,
  booksNotFound: false,
  selectedBook: null,
  lastSearch: '',
  error: null,
}

export default initialState
