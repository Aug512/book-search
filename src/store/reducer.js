import initialState from './initialState'
import { SET_OFFSET, STORE_REQUEST } from './actions'
import { FETCH_BOOKS_START, FETCH_BOOKS_SUCCESS, FETCH_BOOKS_FAILURE, CLEAR_BOOKS } from './actions'
import { BOOKS_NOT_FOUND, SELECT_BOOK } from './actions'

const reducer = (state = initialState, action) => {
  
  switch (action.type) {
    case SET_OFFSET:
      return {
        ...state,
        offset: action.payload,
      }

    case FETCH_BOOKS_START:
      return {
        ...state,
        booksNotFound: false,
        showLoader: true,
        error: null,
      }

    case BOOKS_NOT_FOUND:
      return {
        ...state,
        booksNotFound: true,
        showLoader: false,
      }
    
    case FETCH_BOOKS_SUCCESS:
      if (state.offset === 0 ) {
        return {
          ...state,
          books: action.payload,
          showLoader: false,
        }
      } else {
        return {
          ...state,
          books: [
            ...state.books,
            ...action.payload,
          ],
          showLoader: false,
        }
      }
      

    case FETCH_BOOKS_FAILURE:
      return {
        ...state,
        showLoader: false,
        error: action.payload,
      }

    case CLEAR_BOOKS:
      return {
        ...state,
        booksNotFound: false,
        showLoader: false,
        books: [],
      }

    case SELECT_BOOK:
      return {
        ...state,
        selectedBook: action.payload,
      }

    case STORE_REQUEST:
      return {
        ...state,
        lastSearch: action.payload,
      }
  
    default:
      return state
  }
}

export default reducer
