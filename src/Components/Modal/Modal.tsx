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
          <li>
            <strong>Objective:</strong> Guess the word before the hangman is fully drawn.
          </li>
          <li>
            <strong>Description:</strong> The word is shown with blank spaces. Click a letter to guess. If you're right, the letter will appear in the
            word. If you're wrong, part of the hangman will be drawn.
          </li>
          <li>
            <strong>Wrong Guesses:</strong> You have 6 wrong guesses. Each wrong guess adds to the hangman drawing. If it's completed, you lose. ⚠️
          </li>
          <li>
            <strong>No Hints:</strong> All words are part of the english language. There are no hints provided during the game. 🚫💡
          </li>
          <li>
            <strong>Tips:</strong> Try guessing common letters in english words like "e", "t", "r", and "n".
          </li>
          <li>
            <strong>Restart:</strong> Click 'Try Again' to start over after the game ends.
          </li>
        </ul>
        <p className={styles.luck}>We wish you the best of luck! Enjoy the game! 🍀</p>
      </div>
    </div>
  )
}
