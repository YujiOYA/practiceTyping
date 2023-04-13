import { memo, useEffect } from "preact/compat";
import { DataSprites } from "../types/api/DataSprites";
import Loading from "./Loading";



type Props = {
  stateGet: boolean
  pokemonImage?: DataSprites
  pokemonName: string
  sealedName: string
  changePokemon: () => void
  isLoading: boolean
}

const MainWindow = memo((props: Props) => {
  if (props.stateGet) {
    useEffect(props.changePokemon, [props.stateGet])
  }
  return (
    <>
      {props.stateGet ?
        <div style={{ padding: "8px", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", height: "50vh", background: "#fac56a" }}>
          <h2 style={{ fontWeight: "800" }}>
            ポケモンゲットだぜ！
          </h2>
          <img src={props.pokemonImage?.sprites?.front_default} style={{ display: "block", flexGrow: "1" }} />
          <h3 >
            {props.pokemonName}
          </h3>
        </div>
        :
        <div style={{ boxSizing: "border-box", padding: "8px", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", height: "50vh" }}>
          {(!props.isLoading)&&<img src={props.pokemonImage?.sprites?.back_default} style={{ display: "block", width: "auto", height: "100%", margin: "0px, auto" }} />}
          <h2>
            {(props.sealedName == "")
              ? <></>
              : 
              <>
                {(props.isLoading)
                ?
                <Loading/>
                :
                <>やせいの　{props.sealedName}が　あらわれた</>}
              </>
            }
          </h2>

        </div>
      }
    </>




  )
})

export default MainWindow