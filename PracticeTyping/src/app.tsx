import { createContext } from 'preact';
import './app.css'
import Composer from './components/Composer';
import { useState } from 'preact/hooks';

export const PokemonIds = createContext<number[]>([]);


export function App() {
  const [pokemonIds, setPokemonIds] = useState<number[]>([])
  return (
    <>
      {pokemonIds.map((item: number, i: number) => {
        const value = pokemonIds
        return (
          <PokemonIds.Provider value={value} key = {i}>
            <Composer />
          </PokemonIds.Provider>
        )
      })
      }
    </>
  )
}