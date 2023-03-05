
import { useRef, useState } from "preact/hooks"
import { Retsu } from "../types/Retsu"
import { JSX } from "preact/jsx-runtime"

export default function Row() {
  let gojuuon = "　あいうえおKかきくけこSさしすせそTたちつてとNなにぬねのHはひふへほMまみむめもYやいゆえよRらりるれろWわいうえを　AIUEO"
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
    console.log(value);
    console.log(gojuuonMultiArr[clickedPosition.row][clickedPosition.col].moji);
    if (clickedPosition.col == 10) {
      setAppending("")
      if (value[value.length-1] === gojuuonMultiArr[clickedPosition.row][10].moji) {
        setValue(value)
      }
    }

    if (han2Zen(value[value.length-1].toLowerCase()) === han2Zen(gojuuonMultiArr[0][clickedPosition.col].moji.toLowerCase())) {
      setValue(value)
      setAppending("")
      setAppending2("appending2")
      return
    }
    if (value[value.length-1] === gojuuonMultiArr[clickedPosition.row][clickedPosition.col].moji && appending === "") {      
      setValue(value)
      setAppending2("")
      return
    }

  }



  return (
    <>
      <h2>
        {value}
      </h2>
        {/* <h3>
          {gojuuonMultiArr[0][clickedPosition.col]}と{gojuuonMultiArr[clickedPosition.row][0]}
        </h3> */}
      <input
        value={value}
        autoFocus={true}
        onKeyDown={(ev) => handleInput(ev.currentTarget.value)}
        ref={inputEl}
      />
      {gojuuonMultiArr.map((e: Retsu[], i: number) => {
        return (
          <div
            className="flexbox"
            style={{
              display: "flex",
              width: "80vw",
              justifyContent: "center"
            }}>

            <>

              {e.map((str: Retsu, i: number) => {
                return (
                  <div key={i} style={{ width: "9.5%", margin: "2px" }}>
                    <button
                      className={(str.gyou === 0 && clickedPosition.col === i && clickedPosition.col !== 10) ? appending : (clickedPosition.row === str.gyou && i === 0) ? appending2 : ""}
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
