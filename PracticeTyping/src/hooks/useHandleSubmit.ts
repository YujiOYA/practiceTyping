import { useEffect, useState } from "preact/hooks"
import { JSX } from "preact/jsx-runtime"

export const useHandleSubmit = (propsPokemonName: string, value: string, id: number, changePokemon: () => void, prevScore: number) => {

  const [isWrong, setIsWring] = useState(false)
  const [timeWrong, setTimeWrong] = useState(0)
  const [stateGet, setStateGet] = useState(false)
  const [score, setScore] = useState(prevScore)


  function handleSubmit(e: JSX.TargetedEvent<HTMLFormElement, Event>) {
    e.preventDefault();
    if (propsPokemonName !== "") {
      if (propsPokemonName !== value) {
        if (timeWrong > 2) {
          return
        }

        setScore(score - 1)
        setIsWring(true);
        setTimeWrong(timeWrong + 1);

        if (timeWrong > 1) {

          setTimeout(async () => {
            setTimeWrong(0);
            setIsWring(false)
            changePokemon()
          }, 3000);
        }
      }
    }
    if (propsPokemonName == value) {
      if (stateGet) {
        return
      }
      setIsWring(false);
      setStateGet(true);
      setScore(score + 1)
      //  getPokemons.push(id)

      setTimeout(async () => {
        setStateGet(false);
        changePokemon()
      }, 3000);
    }
  }
  return { handleSubmit, isWrong, timeWrong, stateGet, score }
}