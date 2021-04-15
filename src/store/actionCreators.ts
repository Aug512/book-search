import { actionType } from './actions'
import { action, storeInterface, bookInterface } from './types'
import addInfScroll from '../utils/infiniteScroll'
import { ThunkAction } from 'redux-thunk'

export const setOffset = (offset: number): action => {
  return {
    type: actionType.SET_OFFSET,
    payload: offset,
  }
}

export const requestBooks = (): action => {
  return {
    type: actionType.FETCH_BOOKS_START,
  }
}

export const requestBooksSuccess = (books: bookInterface[]): action => {
  return {
    type: actionType.FETCH_BOOKS_SUCCESS,
    payload: books,
  }
}

export const requestBooksFailure = (error: Error): action => {
  return {
    type: actionType.FETCH_BOOKS_FAILURE,
    payload: error,
  }
}

export const clearBooksList = (): action => {
  return {
    type: actionType.CLEAR_BOOKS,
  }
}

export const setNotFoundMessage = (state: boolean): action => {
  return {
    type: actionType.BOOKS_NOT_FOUND,
    payload: state,
  }
}

export const setCurrentBook = (book: bookInterface | null): action => {
  return {
    type: actionType.SELECT_BOOK,
    payload: book,
  }
}

export const storeLastRequest = (request: string): action => {
  return {
    type: actionType.STORE_REQUEST,
    payload: request,
  }
}

// async

export const fetchBooks = (search: string): ThunkAction<void, storeInterface, unknown, action> => {
  return async (dispatch, getState) => {
    const requestParam = search.split(' ').join('+')
    const offset = getState().offset
    const lastSearch = getState().lastSearch

    try {
      if (search.trim() && (search !== lastSearch || offset !== 0)) {
        dispatch(requestBooks())
        const response = await fetch(`https://openlibrary.org/search.json?title=${requestParam}&limit=10&offset=${offset}`)
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
