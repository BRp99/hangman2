import DisplayWord from "../DisplayWord/DisplayWord"
import Hangman from "../Hangman/Hangman"
import Keyboard from "../Keyboard/Keyboard"
import styles from "./App.module.css"
import { useState, useEffect } from "react"
import englishWords from "../../words.json"
import Lottie from "lottie-react"
import fireWorkAnimation from "../../firework.json"

function getWords() {
  return englishWords[Math.floor(Math.random() * englishWords.length)]
}

export default function App() {
  const [wordToGuess, setWordToGuess] = useState(getWords())
  const [guessedLetter, setGuessedLetter] = useState<string[]>([])

  const incorrectLetter = guessedLetter.filter((letter) => !wordToGuess.includes(letter))

  const isLoser = incorrectLetter.length >= 6
  const isWinner = wordToGuess.split("").every((letter) => guessedLetter.includes(letter))

  function addGuessedLetter(letter: string) {
    if (guessedLetter.includes(letter) || isLoser || isWinner) return
    setGuessedLetter((currentLetters) => [...currentLetters, letter])
  }

  function reset() {
    setGuessedLetter([])
    setWordToGuess(getWords())
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (key.match(/^[a-z]$/)) {
        e.preventDefault()
        addGuessedLetter(key)
      } else if (key === "Enter") {
        e.preventDefault()
        reset()
      }
    }

    document.addEventListener("keypress", handler)
    return () => document.removeEventListener("keypress", handler)
  }, [])

  return (
    <div className={styles.containerApp}>
      <div className={styles.infoMessage}>Note: This game does not provide hints. All words are in English.</div>
      <div className={styles.winnerOrLoser}>
        {isWinner && (
          <>
            <span>You Win!! - Refresh the page to start again or click enter</span>
            <Lottie animationData={fireWorkAnimation} autoplay loop />
          </>
        )}
        {isLoser && (
          <>
            <div className={styles.niceTry}>Nice Try - Click enter or press the button to try again.</div>
            <button className={styles.tryAgainButton} onClick={reset}>
              Try Again
            </button>
          </>
        )}
      </div>
      {!isWinner && (
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
