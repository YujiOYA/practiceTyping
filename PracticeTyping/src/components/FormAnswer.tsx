import { JSX } from "preact/jsx-runtime";
import { Ref } from "preact";



type NewType = Ref<HTMLInputElement>;

type Props = {
    handleSubmit: (e: JSX.TargetedEvent<HTMLFormElement, Event>) => void
    handleInput: (value: string) => void
    value: string
    inputEl: NewType
    stateGet: boolean    
}
export default function FormAnswer(props: Props) {
  if(props.stateGet===true){
    props.handleInput("")
  }

  return (
    <form onSubmit={(e:JSX.TargetedEvent<HTMLFormElement, Event>) => props.handleSubmit(e)}>
              <input
                placeholder={"ポケモンの　なまえを　いれよう！"}
                value={props.value}
                autoFocus={true}
                onInput={(ev) => props.handleInput(ev.currentTarget.value)}
                ref={props.inputEl}
                style={{ fontSize: "1.4rem", width: "600px" }}
              />
              
              <button type="submit" value={props.value} >ゲットだぜ</button>
            </form>
  )
}
