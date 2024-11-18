import { useEffect } from 'react'
import styles from './Modal.module.css'
import { IoClose } from 'react-icons/io5'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function Modal({ isOpen, onClose }: Props) {
  useEffect(() => {
    if (!isOpen) return
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  if (!isOpen) return null

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <button className={styles.closeIcon} onClick={onClose}>
          <IoClose />
        </button>
        <h2>How to Play</h2>
        <ul>
          <li>Guess the hidden word by clicking on the letters.</li>
          <li>Each incorrect guess will draw a part of the hangman.</li>
          <li>You have a total of 6 incorrect guesses before you lose.</li>
        </ul>
      </div>
    </div>
  )
}
