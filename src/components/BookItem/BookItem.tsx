import React from 'react'
import { useDispatch } from 'react-redux' 
import { setCurrentBook } from '../../store/actionCreators'
import { bookInterface } from '../../store/types'
import styles from './BookItem.module.scss'

type BookItemProps = {
  book: bookInterface
}

const BookItem: React.FC<BookItemProps> = ({ book }) => {

  const dispatch = useDispatch()

  const openBookByKeyboard = (evt: KeyboardEvent): void => {
    if (evt.key === ' ' || evt.key === 'Enter') {
      const target: HTMLElement = evt.currentTarget as HTMLElement
      target.click();
    }
  } 

  const focusBookHandler = (evt: React.FocusEvent): void => {
    const target: HTMLElement = evt.currentTarget as HTMLElement
    target.addEventListener('keypress', openBookByKeyboard)
  }

  const blurBookHandler = (evt: React.FocusEvent): void => {
    const target: HTMLElement = evt.currentTarget as HTMLElement
    target.removeEventListener('keypress', openBookByKeyboard)
  }

  return (
    <div
      className={styles.book}
      onClick={() => dispatch(setCurrentBook(book))}
      tabIndex={0}
      onFocus={focusBookHandler}
      onBlur={blurBookHandler}
    >
    {book.cover_i && book.cover_i[0] !== '-1'
      ? <img
        className={styles.book__cover}
        src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
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
