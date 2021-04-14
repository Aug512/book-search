import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import styles from './ErrPopup.module.scss'

const ErrPopup = () => {

  const errorPopup = useRef()

  useEffect(() => {
    errorPopup.current.classList.add(styles.show)
    setTimeout(() => {
      errorPopup.current.classList.remove(styles.show)
    }, 3000)
  }, [])

  const message = useSelector(state => state.error.message ?? "Непредвиденная ошибка. Перезагрузите страницу, или попробуйте позже...")

  return (
    <div className={styles.popup} ref={errorPopup}>
      <strong className={styles.message}>{message}</strong>
    </div>
  )
}

export default ErrPopup
