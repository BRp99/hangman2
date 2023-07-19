import styles from "./DisplayWord.module.css"

interface Props {
  wordToGuess: string
  guessedLetter: string[]
  reveal?: boolean
}

export default function DisplayWord({
  wordToGuess,
  guessedLetter,
  reveal = false,
}: Props) {
  return (
    <div className={styles.container}>
      {wordToGuess.split("").map((letter, index) => (
        <div className={styles.letter} key={index}>
          <div
            style={{
              visibility:
                guessedLetter.includes(letter) || reveal ? "visible" : "hidden",
              color:
                !guessedLetter.includes(letter) && reveal ? "red" : "white",
            }}
          >
            {letter}
          </div>
        </div>
      ))}
    </div>
  )
}
