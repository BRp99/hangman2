import styles from './Hangman.module.css'

interface Props {
  numberOfGuesses: number
}

const head = <div key="head" className={styles.head} />
const body = <div key="body" className={styles.body} />
const rightArm = <div key="rightArm" className={styles.rightArm} />
const leftArm = <div key="leftArm" className={styles.leftArm} />
const rightLeg = <div key="rightLeg" className={styles.rightLeg} />
const lefLeg = <div key="lefLeg" className={styles.lefLeg} />

const hangman = [head, body, rightArm, leftArm, rightLeg, lefLeg]

export default function Hangman({ numberOfGuesses }: Props) {
  return (
    <div className={styles.gallowDraw}>
      <div className={styles.gallowTopVertical} />
      {hangman.slice(0, numberOfGuesses)}
      <div className={styles.gallowTop} />
      <div className={styles.verticalBar} />
      <div className={styles.gallowBase} />
    </div>
  )
}
