import React from 'react'
import styles from './BookItem.module.scss'

const BookItem = ({ book, setSelectedBook }) => {

  const openBookByKeyboard = (evt) => {
    if (evt.key === ' ' || evt.key === 'Enter') {
      evt.target.click();
    }
  } 

  const focusBookHandler = (evt) => {
    evt.target.addEventListener('keypress', openBookByKeyboard)
  }

  const blurBookHandler = (evt) => {
    evt.target.removeEventListener('keypress', openBookByKeyboard)
  }

  return (
    <div
      className={styles.book}
      onClick={() => setSelectedBook(book)}
      tabIndex='0'
      onFocus={focusBookHandler}
      onBlur={blurBookHandler}
    >
    {book.cover_i && book.cover_i !== -1
      ? <img
        className={styles.book__cover}
        src={`http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
        alt={`${book.title} cover`}
      />
      : <div className={`${styles.book__cover_placeholder} ${styles.book__cover}`} />
    }
    <div className={styles.book__info}>
      <h2 className={styles.book__info_title}>{book.title}</h2>
      <hr />
      <h4 className={styles.book__info_authors}>
        {Array.isArray(book.author_name)
          ? book.author_name.join(', ')
          : book.author_name
        }
      </h4>
    </div>
  </div>
  )
}

export default BookItem
