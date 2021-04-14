import { SET_OFFSET, STORE_REQUEST } from './actions'
import { FETCH_BOOKS_START, FETCH_BOOKS_SUCCESS, FETCH_BOOKS_FAILURE, CLEAR_BOOKS } from './actions'
import { BOOKS_NOT_FOUND, SELECT_BOOK } from './actions'
import addInfScroll from '../utils/infiniteScroll'

export const setOffset = (offset) => {
  return {
    type: SET_OFFSET,
    payload: offset,
  }
}

export const requestBooks = () => {
  return {
    type: FETCH_BOOKS_START,
  }
}

export const requestBooksSuccess = (books) => {
  return {
    type: FETCH_BOOKS_SUCCESS,
    payload: books,
  }
}

export const requestBooksFailure = (error) => {
  return {
    type: FETCH_BOOKS_FAILURE,
    payload: error,
  }
}

export const clearBooksList = () => {
  return {
    type: CLEAR_BOOKS,
  }
}

export const setNotFoundMessage = (boolstate) => {
  return {
    type: BOOKS_NOT_FOUND,
    payload: boolstate,
  }
}

export const setCurrentBook = (book) => {
  return {
    type: SELECT_BOOK,
    payload: book,
  }
}

export const storeLastRequest = (string) => {
  return {
    type: STORE_REQUEST,
    payload: string,
  }
}

// async

export const fetchBooks = (search) => {
  return async (dispatch, getState) => {
    const requestParam = search.split(' ').join('+')
    const offset = getState().offset
    const lastSearch = getState().lastSearch

    try {
      if (search.trim() && (search !== lastSearch || offset !== 0)) {
        dispatch(requestBooks())
        const response = await fetch(`http://openlibrary.org/search.json?title=${requestParam}&limit=10&offset=${offset}`)
          .then(response => response.json())
        if (response.docs.length === 0 && getState().books.length === 0) {
          dispatch(setNotFoundMessage(true))
        } else {
          dispatch(requestBooksSuccess(response.docs))
        }
        if (response.docs.length > 0) document.addEventListener('scroll', addInfScroll)
      } else if (!search.trim()) {
        dispatch(clearBooksList())
      } else return
    } catch (err) {
      dispatch(requestBooksFailure(err))
    }
    dispatch(storeLastRequest(search))
  }
}
