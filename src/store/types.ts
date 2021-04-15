import { actionType } from './actions'

// state interfaces

export interface storeInterface {
  offset: number
  limit: number
  books: bookInterface[] | []
  showLoader: boolean
  booksNotFound: boolean
  selectedBook: bookInterface | null
  lastSearch: string
  error: Error | null
}

export interface bookInterface {
  key: string
  title: string
  author_name: string[]
  cover_i?: string[]
  publish_date?: string[]
  publisher?: string[]
  isbn?: string[]
}

// actionCreators

interface setOffset {
  type: actionType.SET_OFFSET
  payload: number
}

interface requestBooks {
  type: actionType.FETCH_BOOKS_START
}

interface requestBooksSuccess {
  type: actionType.FETCH_BOOKS_SUCCESS
  payload: bookInterface[]
}

interface requestBooksFailure {
  type: actionType.FETCH_BOOKS_FAILURE
  payload: Error
}

interface clearBooksList {
  type: actionType.CLEAR_BOOKS
}

interface setNotFoundMessage {
  type: actionType.BOOKS_NOT_FOUND
  payload: boolean
}

interface setCurrentBook {
  type: actionType.SELECT_BOOK
  payload: bookInterface | null
}

interface storeLastRequest {
  type: actionType.STORE_REQUEST
  payload: string
}

export type action = setOffset
  | requestBooks
  | requestBooksSuccess
  | requestBooksFailure
  | clearBooksList
  | setNotFoundMessage
  | setCurrentBook
  | storeLastRequest
