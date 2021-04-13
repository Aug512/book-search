import { useState, useRef, useEffect, useCallback } from 'react'

const App = () => {
  const [offset, setOffset] = useState(0)
  const [books, setBooks] = useState([])

  const limit = 10
  let lastSearch = ''
  const searchInput = useRef()

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
    try {
      const search = searchInput.current.value.split(' ').join('+')
      lastSearch = searchInput.current.value
      const response = await fetch(`http://openlibrary.org/search.json?q=${search}&limit=10&offset=${offset}`)
        .then(response => response.json())
        .then(json => {console.log(json); return json})
      if (offset === 0) {
        setBooks(response.docs)        
      } else {
        setBooks(prev => [...prev, ...response.docs])
      }
      if (response.docs.length > 0) document.addEventListener('scroll', addInfScroll)
    } catch (error) {
      console.error(error) 
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

  return (
    <div className="App">
      <input
        type="text"
        onChange={(e) => {
          setOffset(0)
          timer.reset()
        }}
        ref={searchInput}
      />
      <button onClick={() => setOffset(prev => (prev + limit))}>Next</button>
      <div className='books'>
        {books.map(book => <div className="book" key={book.key}>
          {book.cover_i && <img src={`http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} alt={`${book.title} cover`} />}
          <h2>{book.title}</h2>
          <h3>{book.author_name}</h3>
          <hr />
        </div>)}
      </div>
    </div>
  )
}

export default App
