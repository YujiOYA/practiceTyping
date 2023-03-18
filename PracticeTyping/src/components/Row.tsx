
import { useRef, useState } from "preact/hooks"
import { Retsu } from "../types/Retsu"



export default function Row() {
  let gojuuon = "　あいうえおKかきくけこSさしすせそTたちつてとNなにぬねのHはひふへほMまみむめもYやいゆえよRらりるれろWわいうえをGがぎぐげごZざじずぜぞDだぢづでどBばびぶべぼPぱぴぷぺぽ　AIUEO"
  const numOfCol = gojuuon.length / 6 - 1
  type GojuuonMultiArr = [
    rowConsonant: Retsu[],
    rowA: Retsu[],
    rowI: Retsu[],
    rowU: Retsu[],
    rowE: Retsu[],
    rowO: Retsu[]
  ]
  const retsu: Retsu = {
    gyou: 0,
    moji: ""
  }
  const gojuuonMultiArr: GojuuonMultiArr = [
    [],
    [],
    [],
    [],
    [],
    []
  ]
  let i: number = 0
  let j: number = 5
  let k: number[] = [0, 1, 2, 3, 4, 5]

  while (i < gojuuon.length) {
    if (i % 6 == k[i % 6]) {
      const elm: Retsu = {
        gyou: k[i % 6],
        moji: gojuuon[i]
      }
      gojuuonMultiArr[i % 6].unshift(elm)
    }
    i++
  }

  const position = {
    row: 0,
    col: 0
  }



  const [appending, setAppending] = useState("");
  const [appending2, setAppending2] = useState("");
  const [clickedPosition, setClickedPosition] = useState(position);
  const [okFlg, setOk] = useState(true);


  const inputEl = useRef<HTMLInputElement>(null)

  const handleButtonState = (ev: Retsu, i: number) => {
    const p = {
      row: ev.gyou,
      col: i
    }
    setAppending("appending")
    setAppending2("appending2")
    setClickedPosition(p)
    inputEl.current?.focus();
  }

  const [value, setValue] = useState("")

  function han2Zen(str: string) {
    return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
      return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
  }
  const handleInput = (value: string): void => {
    if (pokemon == value) {
      setStateGet(true)
      setTimeout(() => {
        getPokemon()
        setStateGet(false)
      }, 6000)

    }



    console.log(value);
    console.log(gojuuonMultiArr[clickedPosition.row][clickedPosition.col].moji);
    if (clickedPosition.col == numOfCol) {
      setAppending("")
      if (value[value.length - 1] === gojuuonMultiArr[clickedPosition.row][numOfCol].moji) {
        setValue(value)
      }
    }

    if (han2Zen(value[value.length - 1].toLowerCase()) === han2Zen(gojuuonMultiArr[0][clickedPosition.col].moji.toLowerCase())) {
      setValue(value)
      setAppending("")
      setAppending2("appending2")
      return
    }
    if (value[value.length - 1] === gojuuonMultiArr[clickedPosition.row][clickedPosition.col].moji && appending === "") {
      setValue(value)
      setAppending2("")
      return
    }



  }
  const [pokemon, setPokemon] = useState("");
  const [sealdName, setSealdName] = useState("");
  const [pokemonImage, setPokemonImage] = useState<DataSprites>();

  type DataSprites = {
    sprites?: {
      back_default: string,
      back_female?: string,
      back_shiny: string,
      back_shiny_female?: string,
      front_default: string,
      front_female?: string,
      front_shiny: string,
      front_shiny_femalestring?: string
    }
  }
  type DataName = {
    names: Array<{ name: string }>
  }
  const getPokemon = async () => {
    const resSprites = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const resName = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    const dataSprites: DataSprites = await resSprites.json()
    const dataName: DataName = await resName.json()
    const lengthOfName = dataName.names[9].name.length
    let i =0
    let sealedName = "" 
    while(i < lengthOfName){
     sealedName += "◯" 
      i++
    }
    setPokemon(dataName.names[9].name)
    setSealdName(sealedName)
    setPokemonImage(dataSprites)
    handleId(min, max)
    console.log(sealdName);
  }
  const min = 1;

  const max = 500;
  function random(max: number, min: number): number {
    return Math.floor(Math.random() * (max + 1 - min)) + min
  };
  const [id, setId] = useState(random(min, max))
  const handleId = (min: number, max: number) => {
    setId(random(min, max))
  }

  const [stateGet, setStateGet] = useState(false);
  
  ()=>getPokemon()


  return (
    <>
      {stateGet ?
        <>
          <div style={{ boxSizing: "border-box", padding: "8px", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", height: "50vh", background: "#fac56a" }}>
            <h2 style={{ fontWeight: "800" }}>
              ポケモンゲットだぜ！
            </h2>
            <img src={pokemonImage?.sprites?.front_shiny} style={{ width: "auto", height: "100%" }} />
            <h3 >
              {pokemon}
            </h3>
          </div>
        </>
        :
        <div style={{ boxSizing: "border-box", padding: "8px", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", height: "50vh" }}>
          <img src={pokemonImage?.sprites?.back_default} style={{ display: "block", width: "auto", height: "100%", margin: "0px, auto" }} />
          <h2>
            {sealdName}
            {console.log(sealdName)}
            {(sealdName=="")
            ?<></>
            :<>
            が　くさむらから　とびだした
            </>
            }
          </h2>

        </div>
      }



      <div style={{ boxSizing: "border-box", padding: "8px", display: "flex", justifyContent: "space-around", flexDirection: "row", alignItems: "center" }}>
        <button onClick={() => getPokemon()}>つぎのポケモン！</button>
        {console.log(sealdName)}
            {(sealdName=="")
            ?<></>
            :<>
      <input
        placeholder={"ポケモンの　なまえを　いれよう！"}
        value={value}
        autoFocus={true}
        onKeyDown={(ev) => handleInput(ev.currentTarget.value)}
        ref={inputEl}
        style={{ fontSize: "1.4rem", width:"600px" }}
        
      />
      </>
}
      </div>



      {gojuuonMultiArr.map((e: Retsu[], i: number) => {
        return (
          <div
            className="flexbox"
            style={{
              display: "flex",
              width: "87vw",
              justifyContent: "center",
              boxSizing: "borderBox"
            }}>

            <>

              {e.map((str: Retsu, i: number) => {
                return (
                  <div key={i} style={{ width: "100%", margin: "2px" }}>
                    <button
                      className={(str.gyou === 0 && clickedPosition.col === i && clickedPosition.col !== numOfCol) ? appending : (clickedPosition.row === str.gyou && i === 0) ? appending2 : ""}
                      onClick={() => handleButtonState(str, i)} disabled={(i === 0 || str.gyou === 0) && true}
                      style={{ margin: "2px", width: "100%" }}
                    >
                      {str.moji}
                    </button>
                  </div>
                )
              })
              }
            </>
          </div>
        )
      })}
    </>
  )
}
