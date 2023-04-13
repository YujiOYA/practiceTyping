
import { useCallback, useEffect, useRef, useState } from "preact/hooks"
import { Retsu } from "../types/Retsu"
import { JSX } from "preact/jsx-runtime"
import { DataSprites } from "../types/api/DataSprites";
import { DataName } from "../types/api/DataName";
import { useSetPokemon } from "../hooks/useSetPokemon";
import { useHandleSubmit } from "../hooks/useHandleSubmit";
import MainWindow from "./MainWindow";
import FormAnswer from "./FormAnswer";
import memo from "preact/compat"


export default function Row() {

  const inputEl = useRef<HTMLInputElement>(null)
  inputEl.current?.focus();

  const min = 1;
  const max = 151;
  const rand = () => { return Math.floor(Math.random() * (max + 1 - min)) + min }
  const [id, setId] = useState(rand)
  
  const { setPokemon, pokemonName, sealedName, pokemonImage, isLoading } = useSetPokemon(id);
  const [value, setValue] = useState("")
  const handleInput = ((value: string): void => {
    console.log(value);
    setValue(value)
  })
  
  const [prevScore, setScore] = useState(0)
  const [prevGetPokemons,setGetPokemons] = useState<number[]>([0])
  
  const changePokemon = () => {
    const id = rand()
    setPokemon(id)
    setId(id)
  }
  const { handleSubmit, isWrong, timeWrong, stateGet, score, getPokemons } = useHandleSubmit(pokemonName, value, id, changePokemon, prevScore, prevGetPokemons)
  setGetPokemons(getPokemons)
  
  return (
    <>
      <MainWindow stateGet={stateGet} pokemonImage={pokemonImage} pokemonName={pokemonName} sealedName={sealedName} changePokemon={changePokemon} isLoading={isLoading}/>
      点数：{score}

      <div style={{ boxSizing: "border-box", padding: "8px", display: "flex", justifyContent: "space-around", flexDirection: "row", alignItems: "center" }}>
        <button onClick={changePokemon}>
          つぎのポケモン！
        </button>
        {(sealedName == "")
          ? <></>
          : <>
            <FormAnswer
              handleSubmit={handleSubmit}
              handleInput={handleInput}
              value={value}
              inputEl={inputEl}
              stateGet={stateGet}
            />
          </>
        }
      </div>
      {(isWrong) ?
        (1 <= timeWrong && timeWrong < 3) ?
          <>
            <p style={{ color: "#fcc" }}>まちがっているようだ</p>
          </>
          :
          (timeWrong >= 3) &&
          <>
            <p style={{ color: "#fcc" }}>ポケモンはにげてしまった</p>

          </>
        : <>
        </>
      }

    </>
  )
}