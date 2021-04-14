import { useRef, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchBooks, setOffset } from '../../store/actionCreators'
import BookItem from '../BookItem/BookItem'
import Modal from '../Modal/Modal'
import ErrPopup from '../ErrPopup/ErrPopup'
import Loader from '../Loader/Loader'
import addInfScroll from '../../utils/infiniteScroll'
import Timer from '../../utils/timer'
import styles from './App.module.scss'

const App = () => {
  const offset = useSelector(state => state.offset)
  const books = useSelector(state => state.books)
  const lastSearch = useSelector(state => state.lastSearch)
  const isLoading = useSelector(state => state.showLoader)
  const isError = useSelector(state => state.error ?? false)
  const notFoundMessage = useSelector(state => state.booksNotFound)
  const selectedBook = useSelector(state => state.selectedBook)

  const dispatch = useDispatch()

  const searchInput = useRef()
  const disclaimer = useRef()

  const timer = new Timer(() => {
    dispatch(fetchBooks(searchInput.current.value))
  }, 1000)
  timer.stop()

  const memoizedFetch = useCallback(() => {
    if (offset !== 0 || searchInput.current.value.trim() !== lastSearch) {
      timer.reset()
    }
  }, [offset, lastSearch])

  useEffect(() => {
    document.removeEventListener('scroll', addInfScroll)
    memoizedFetch()
  }, [offset, memoizedFetch])

  useEffect(() => {
    if (books.length === 0) {
      disclaimer.current.classList.add(`${styles.show}`)
    } 
  }, [books])

  return (
    <div className={styles.app}>
      {isError && <ErrPopup />}
      {selectedBook && <Modal />}
      <h1 className={styles.title}>
        Книги
      </h1>
      <div className={styles.search}>
        <input
          className={styles.search__input}
          type="text"
          onChange={(e) => {
            if (offset !== 0) dispatch(setOffset(0))
            timer.reset()
          }}
          placeholder='Введите название книги'
          ref={searchInput}
        />
        <button
          className={styles.search__button}
          onClick={() => {timer.stop(); dispatch(fetchBooks(searchInput.current.value))}}
        >
          Найти
        </button>
      </div>

      {books.length === 0 && <small id='disclaimer' className={styles.disclaimer} ref={disclaimer}>
      Так как API не поддерживает русский язык, для поиска книги вводите её название транслитом, например <b>"Ponedel'nik nachinaetsya v subbotu"</b>
      </small>}
      
      {isLoading && books.length === 0 && <Loader />}

      {notFoundMessage
        ? <p className={styles.noBooks}>К сожалению, по вашему запросу ничего найти не удалось</p>
        : <div className='books'>
            {books.map(book => <BookItem book={book} key={book.key} />)}
          </div>
      }
    </div>
  )
}

export default App
