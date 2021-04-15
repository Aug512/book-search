import initialState from './initialState'
import { actionType } from './actions'
import { storeInterface, action } from './types'

// import { SET_OFFSET, STORE_REQUEST } from './actions'
// import { FETCH_BOOKS_START, FETCH_BOOKS_SUCCESS, FETCH_BOOKS_FAILURE, CLEAR_BOOKS } from './actions'
// import { BOOKS_NOT_FOUND, SELECT_BOOK } from './actions'

const reducer = (state: storeInterface = initialState, action: action) => {
  
  switch (action.type) {
    case actionType.SET_OFFSET:
      return {
        ...state,
        offset: action.payload,
      }

    case actionType.FETCH_BOOKS_START:
      return {
        ...state,
        booksNotFound: false,
        showLoader: true,
        error: null,
      }

    case actionType.BOOKS_NOT_FOUND:
      return {
        ...state,
        booksNotFound: true,
        showLoader: false,
      }
    
    case actionType.FETCH_BOOKS_SUCCESS:
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
      

    case actionType.FETCH_BOOKS_FAILURE:
      return {
        ...state,
        showLoader: false,
        error: action.payload,
      }

    case actionType.CLEAR_BOOKS:
      return {
        ...state,
        booksNotFound: false,
        showLoader: false,
        books: [],
      }

    case actionType.SELECT_BOOK:
      return {
        ...state,
        selectedBook: action.payload,
      }

    case actionType.STORE_REQUEST:
      return {
        ...state,
        lastSearch: action.payload,
      }
  
    default:
      return state
  }
}

export default reducer
