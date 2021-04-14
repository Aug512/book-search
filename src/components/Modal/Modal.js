import React, { useEffect, useRef } from 'react'
import styles from './Modal.module.scss'

const Modal = ({ book, setSelectedBook }) => {

  const overlay = useRef()
  const modal = useRef()

  const formatIsbn = (isbn) => {
    if (isbn.length === 13) {
      return `${isbn.slice(0, 3)}-${isbn[3]}-${isbn.slice(4, 8)}-${isbn.slice(8, 12)}-${isbn[12]}`
    } else if (isbn.length === 10) {
      return `${isbn[0]}-${isbn.slice(1, 5)}-${isbn.slice(5, 9)}-${isbn[9]}`
    } else return isbn
  }

  const closeModal = () => {
    overlay.current.classList.remove(styles.show)

    setTimeout(() => setSelectedBook(null), 600)
  }

  useEffect(() => {
    overlay.current.classList.add(styles.show)

    modal.current.focus()
  }, [])

  return (
    <div ref={overlay} className={styles.overlay} onClick={closeModal}>
      <main ref={modal} className={styles.bookData} onClick={e => e.stopPropagation()} tabIndex='1'>
      <button
        className={styles.closeModalBtn}
        onClick={closeModal}
        tabIndex='1'
      >
        &times;
      </button>
        {book.cover_i && book.cover_i !== -1
          ? <img
            className={styles.bookData__cover}
            src={`http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
            alt={`${book.title} cover`}
          />
          : <div className={`${styles.bookData__cover_placeholder} ${styles.bookData__cover}`} />
        }
        <div className={styles.bookData__info}>
          <h2 className={styles.bookData__info_title}>
            {book.title}
          </h2>
          <p className={styles.bookData__info_author}>
            {book.author_name.length > 1
              ? <>Авторы: <b>{book.author_name.join(', ')}</b></>
              : <>Автор: <b>{book.author_name}</b></>
            }
          </p>
          <div className={styles.bookData__info_additional}>
            <b className={styles.bookData__info_addTitle}>Дата публикации:</b>
            <span className={styles.bookData__info_addValue}>
              {book.publish_date[0]}
            </span>
          </div>
          <div className={styles.bookData__info_additional}>
            <b className={styles.bookData__info_addTitle}>Издатель:</b>
            <span className={styles.bookData__info_addValue}>
              {book.publisher[0]}
            </span>
          </div>
          <div className={styles.bookData__info_additional}>
            <b className={styles.bookData__info_addTitle}>ISBN:</b>
            <span className={styles.bookData__info_addValue}>
              {book.isbn? formatIsbn(book.isbn[0]) : 'ISBN отсутствует'}
            </span>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Modal
