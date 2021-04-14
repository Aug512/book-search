import { useState, useRef, useEffect, useCallback } from 'react'
import BookItem from '../BookItem/BookItem'
import Modal from '../Modal/Modal'
import styles from './App.module.scss'

const App = () => {
  const [offset, setOffset] = useState(0)
  const [books, setBooks] = useState([])
  const [notFound, setNotFound] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)

  const limit = 10
  let lastSearch = ''
  const searchInput = useRef()
  const disclaimer = useRef()

  function Timer(fn, t) {
    let timerObj = setTimeout(fn, t)

    this.stop = function() {
      if (timerObj) {
        clearTimeout(timerObj)
        timerObj = null
      }
      return this
    }

    this.start = function() {
      if (!timerObj) {
        this.stop()
        timerObj = setTimeout(fn, t)
      }
      return this
    }

    this.reset = function(newT = t) {
      t = newT
      return this.stop().start()
    }
  }

  const addInfScroll = () => {
    let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom
    if (windowRelativeBottom < document.documentElement.clientHeight + 1) {
      console.log('im worked')
      setOffset(prev => (prev + limit))
      document.removeEventListener('scroll', addInfScroll)
    }
  }
  
  const fetchData = async() => {
    setNotFound(false)
    const search = searchInput.current.value.split(' ').join('+')
    lastSearch = searchInput.current.value

    if (search.trim()) {
      const response = await fetch(`http://openlibrary.org/search.json?title=${search}&limit=10&offset=${offset}`)
        .then(response => response.json())
        .then(json => {console.log(json); return json})
      if (response.docs.length === 0 && books.length === 0) {
        setNotFound(true)
      }
      if (offset === 0) {
        setBooks(response.docs)        
      } else {
        setBooks(prev => [...prev, ...response.docs])
      }
      if (response.docs.length > 0) document.addEventListener('scroll', addInfScroll)
    } else {
      setBooks([])
    }
  }

  const timer = new Timer(() => {
    fetchData()
  }, 1000)
  timer.stop()

  const memoizedFetch = useCallback(() => {
    if (offset !== 0 || searchInput.current.value.trim() !== lastSearch) {
      timer.reset()
    }
  }, [offset])

  useEffect(() => {
    document.removeEventListener('scroll', addInfScroll)
    console.log('offset', offset)
    memoizedFetch()
  }, [offset, memoizedFetch])

  useEffect(() => {
    if (books.length === 0) {
      disclaimer.current.classList.add(`${styles.show}`)
    } 
  }, [books])

  return (
    <div className={styles.app}>
      {selectedBook && <Modal book={selectedBook} setSelectedBook={setSelectedBook} />}
      <h1 className={styles.title}>
        Книги
      </h1>
      <div className={styles.search}>
        <input
        className={styles.search__input}
          type="text"
          onChange={(e) => {
            setOffset(0)
            timer.reset()
          }}
          ref={searchInput}
        />
        <button
          className={styles.search__button}
          onClick={() => {timer.stop(); fetchData()}}
        >
          Найти
        </button>
      </div>
      {books.length === 0 && <small id='disclaimer' className={styles.disclaimer} ref={disclaimer}>
      Т.к. API не поддерживает русский язык, для поиска книги вводите её название транслитом, например <b>"Ponedel'nik nachinaetsya v subbotu"</b>
      </small>}
      {notFound
        ? <p className={styles.noBooks}>К сожалению, по вашему запросу ничего найти не удалось</p>
        : <div className='books'>
            {books.map(book => <BookItem book={book} key={book.key} setSelectedBook={setSelectedBook}/>)}
          </div>
      }
    </div>
  )
}

export default App
