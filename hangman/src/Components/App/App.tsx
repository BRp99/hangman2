import DisplayWord from "../DisplayWord/DisplayWord"
import Hangman from "../Hangman/Hangman"
import Keyboard from "../Keyboard/Keyboard"
import styles from "./App.module.css"
import { useState, useEffect, useCallback } from "react"
import englishWords from "../../words.json"
import Lottie from "lottie-react"
import fireWorkAnimation from "../../firework.json"

function getWords() {
  return englishWords[Math.floor(Math.random() * englishWords.length)]
}

export default function App() {
  // obj do estado: Rastrear a palavra atual. o valor inicial do estado wordToGuess é uma função que adiciona uma palavra aleatória que está no objeto JSON
  const [wordToGuess, setWordToGuess] = useState(getWords())
  // obj do estado: Rastrear qual a letra que o utilizador escolhe no keyboard. o valor inical é um [vazio]
  const [guessedLetter, setGuessedLetter] = useState<string[]>([])

  // Criar uma variavel para detetar quando as letras (guessedLetter) não correspondem à palavra atual (wordToGuess)= nº de tentativas do utilizador
  const incorrectLetter = guessedLetter.filter(
    (letter) => !wordToGuess.includes(letter)
  )

  const isLoser = incorrectLetter.length >= 6
  const isWinner = wordToGuess
    .split("")
    .every((letter) => guessedLetter.includes(letter))

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
      <div className={styles.winnerOrLoser}>
        {isWinner && (
          <>
            <span>
              You Win!! - Refresh the page to start again or click enter
            </span>
            <Lottie animationData={fireWorkAnimation} autoplay loop />
          </>
        )}
        {isLoser && (
          <>
            <div>Nice Try - Click enter or press the button to try again.</div>
            <button onClick={reset}>Try Again</button>
          </>
        )}
        {/* {isWinner &&
          "You Win!! - Refresh the page to start again or click enter "}
        {isLoser && "Nice Try - Refresh the page to start again or click enter"} */}
      </div>
      {!isWinner && (
        <>
          <Hangman numberOfGuesses={incorrectLetter.length} />
          <DisplayWord
            wordToGuess={wordToGuess}
            guessedLetter={guessedLetter}
            reveal={isLoser}
          />
          <Keyboard
            disabled={isWinner || isLoser}
            activeLetters={guessedLetter.filter((letter) =>
              wordToGuess.includes(letter)
            )}
            inactiveLetters={incorrectLetter}
            addGuessedLetters={addGuessedLetter}
          />
        </>
      )}
    </div>
  )
}
