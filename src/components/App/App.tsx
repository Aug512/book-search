import { useRef, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../utils/useTypedSelector'
import { fetchBooks, setOffset } from '../../store/actionCreators'
// TypeScript (а именно его компилятор) запрещает явно указывать расширение ts/tsx файлов
// @ts-ignore
import BookItem from '../BookItem/BookItem.tsx'
// @ts-ignore
import Modal from '../Modal/Modal.tsx'
// @ts-ignore
import ErrPopup from '../ErrPopup/ErrPopup.tsx'
import Loader from '../Loader/Loader'
import addInfScroll from '../../utils/infiniteScroll'
import Timer from '../../utils/timer'
import { bookInterface } from '../../store/types'
import styles from './App.module.scss'

const App: React.FC = () => {
  const offset = useTypedSelector(state => state.offset)
  const books = useTypedSelector(state => state.books)
  const lastSearch = useTypedSelector(state => state.lastSearch)
  const isLoading = useTypedSelector(state => state.showLoader)
  const isError = useTypedSelector(state => state.error ?? false)
  const notFoundMessage = useTypedSelector(state => state.booksNotFound)
  const selectedBook = useTypedSelector(state => state.selectedBook)

  const dispatch = useDispatch()

  const searchInput = useRef<HTMLInputElement | null>(null)
  const disclaimer = useRef<HTMLElement | null>(null)

  const timer = new Timer(() => {
    dispatch(fetchBooks(searchInput.current!.value))
  }, 1000)
  timer.stop()

  const memoizedFetch = useCallback(() => {
    if (offset !== 0 || searchInput.current!.value.trim() !== lastSearch) {
      timer.reset()
    }
  }, [offset, lastSearch])

  useEffect(() => {
    document.removeEventListener('scroll', addInfScroll)
    memoizedFetch()
  }, [offset, memoizedFetch])

  useEffect(() => {
    if (books.length === 0) {
      disclaimer.current!.classList.add(`${styles.show}`)
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
          onClick={() => {timer.stop(); dispatch(fetchBooks(searchInput.current!.value))}}
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
            {books.map((book: bookInterface) => <BookItem book={book} key={book.key} />)}
          </div>
      }
    </div>
  )
}

export default App
