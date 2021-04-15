import React, { useEffect, useRef } from 'react'
import { useTypedSelector } from '../../utils/useTypedSelector'
import styles from './ErrPopup.module.scss'

const ErrPopup: React.FC = () => {

  const errorPopup = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    errorPopup.current!.classList.add(styles.show)
    setTimeout(() => {
      errorPopup.current!.classList.remove(styles.show)
    }, 3000)
  }, [])

  const message = useTypedSelector(state => state.error?.message ?? "Непредвиденная ошибка. Перезагрузите страницу, или попробуйте позже...")

  return (
    <div className={styles.popup} ref={errorPopup}>
      <strong className={styles.message}>{message}</strong>
    </div>
  )
}

export default ErrPopup
