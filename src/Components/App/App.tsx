import DisplayWord from '../DisplayWord/DisplayWord'
import Hangman from '../Hangman/Hangman'
import Keyboard from '../Keyboard/Keyboard'
import styles from './App.module.css'
import { useState, useEffect } from 'react'
import englishWords from '../../words.json'
import Lottie from 'lottie-react'
import fireWorkAnimation from '../../firework.json'
import Modal from '../Modal/Modal'

function getWords() {
  return englishWords[Math.floor(Math.random() * englishWords.length)]
}

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [wordToGuess, setWordToGuess] = useState(getWords())
  const [guessedLetter, setGuessedLetter] = useState<string[]>([])

  const incorrectLetter = guessedLetter.filter((letter) => !wordToGuess.includes(letter))

  const isLoser = incorrectLetter.length >= 6
  const isWinner = wordToGuess.split('').every((letter) => guessedLetter.includes(letter))

  function addGuessedLetter(letter: string) {
    if (guessedLetter.includes(letter) || isLoser || isWinner) return
    setGuessedLetter((currentLetters) => [...currentLetters, letter])
  }

  function reset() {
    setGuessedLetter([])
    setWordToGuess(getWords())
  }

  function toggleModal() {
    setIsModalOpen((prev) => !prev)
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (key.match(/^[a-z]$/)) {
        e.preventDefault()
        addGuessedLetter(key)
      } else if (key === 'Enter') {
        e.preventDefault()
        reset()
      }
    }

    document.addEventListener('keypress', handler)
    return () => document.removeEventListener('keypress', handler)
  }, [])

  return (
    <div className={styles.containerApp}>
      {!isWinner && !isLoser && (
        <button className={styles.howToPlayButton} onClick={toggleModal}>
          How to Play
        </button>
      )}

      <Modal isOpen={isModalOpen} onClose={toggleModal} />

      <div className={styles.winnerOrLoser}>
        {isWinner && (
          <>
            <span>You Win!!!</span>
            <button className={styles.tryAgainButton} onClick={reset}>
              Try Again
            </button>
            <Lottie animationData={fireWorkAnimation} autoplay loop />
          </>
        )}

        {isLoser && (
          <>
            <div className={styles.loserContainer}>
              <div>Nice Try! Better luck next time.</div>
              <div className={styles.wordReveal}>
                The word was: <strong>{wordToGuess}</strong>
              </div>
              <button className={styles.tryAgainButton} onClick={reset}>
                Try Again
              </button>
            </div>
          </>
        )}
      </div>

      {!isWinner && !isLoser && (
        <>
          <Hangman numberOfGuesses={incorrectLetter.length} />
          <DisplayWord wordToGuess={wordToGuess} guessedLetter={guessedLetter} reveal={isLoser} />
          <Keyboard
            disabled={isWinner || isLoser}
            activeLetters={guessedLetter.filter((letter) => wordToGuess.includes(letter))}
            inactiveLetters={incorrectLetter}
            addGuessedLetters={addGuessedLetter}
          />
        </>
      )}
    </div>
  )
}
