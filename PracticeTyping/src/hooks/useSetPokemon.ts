import { DataSprites } from "../types/api/DataSprites"
import { DataName } from "../types/api/DataName"
import { useCallback, useEffect, useState } from "preact/hooks";

export const useSetPokemon = (id:number) => {
  
  const [pokemonName, setPokemonName] = useState("");
  const [sealedName, setSealedName] = useState("");
  const [pokemonImage, setPokemonImage] = useState<DataSprites>();
  const [isLoading, setLoading] = useState(false)
  const setPokemon = async (id:number) => {
    setLoading(true)
    const resSprites = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const resName = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    const dataSprites: DataSprites = await resSprites.json()
    const dataName: DataName = await resName.json()
    const lengthOfName = dataName.names[9].name.length
    let i = 0
    let sealedName = ""
    while (i < lengthOfName) {
      sealedName += "◯"
      i++
    }
    setPokemonName(dataName.names[9].name)
    setSealedName(sealedName)
    setPokemonImage(dataSprites)
   setLoading(false) 
  }
  return { setPokemon, pokemonName, sealedName, pokemonImage, isLoading }

}