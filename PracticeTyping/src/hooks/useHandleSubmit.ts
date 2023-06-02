import { useEffect, useState } from "preact/hooks"
import { JSX } from "preact/jsx-runtime"

export const useHandleSubmit = (propsPokemonName: string, value: string, id: number, changePokemon:()=>void, prevScore:number, prevGetPokemon:number[]) => {

  const [isWrong, setIsWring] = useState(false)
  const [timeWrong, setTimeWrong] = useState(0)
  const [stateGet, setStateGet] = useState(false)
  const [score, setScore] = useState(prevScore)
  const getPokemons: number[] = prevGetPokemon

  
  function handleSubmit(e: JSX.TargetedEvent<HTMLFormElement, Event>) {
    e.preventDefault();
    console.log(e);
    if (propsPokemonName !== "") {
      if (propsPokemonName !== value) {
        if(timeWrong>2){
          return
        }

        setScore(score - 1)
        setIsWring(true);
        setTimeWrong(timeWrong + 1);
        console.log(timeWrong);

        if (timeWrong > 1) {
          console.log("入れ替え！");

          setTimeout(async () => {
            setTimeWrong(0);
            setIsWring(false)
            changePokemon()
          }, 3000);
        }
      }
    }
    if (propsPokemonName == value) {
      if(stateGet){
        return
      }
      console.log("seikai");
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
  return { handleSubmit, isWrong, timeWrong, stateGet, score, getPokemons}
}