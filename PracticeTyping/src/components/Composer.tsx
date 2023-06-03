import { useRef, useState } from "preact/hooks"
import {memo} from "preact/compat"
import { useSetPokemon } from "../hooks/useSetPokemon";
import { useHandleSubmit } from "../hooks/useHandleSubmit";
import MainWindow from "./MainWindow";
import FormAnswer from "./FormAnswer";


const Composer= function whole() {
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
  
  function changePokemon(){
    const id = rand()
    setPokemon(id)
    setId(id)
    setValue("")
  }
  const { handleSubmit, isWrong, timeWrong, stateGet, score } = useHandleSubmit(pokemonName, value, id, changePokemon, prevScore)
  
  return (
    <>
      <MainWindow stateGet={stateGet} pokemonImage={pokemonImage} pokemonName={pokemonName} sealedName={sealedName} changePokemon={changePokemon} isLoading={isLoading}/>
      点数：{score}

      <div style={{ boxSizing: "border-box", padding: "8px", display: "flex", justifyContent: "space-around", flexDirection: "row", alignItems: "center" }}>
        <button onClick={changePokemon}>
          {(pokemonName==="")?<>スタート！</>:<>つぎのポケモン！</>}
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

export default Composer