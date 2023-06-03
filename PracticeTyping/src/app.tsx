import { createContext } from 'preact';
import './app.css'
import Composer from './components/Composer';
import { useState } from 'preact/hooks';

export const PokemonIds = createContext<number[]>([]);


export function App() {
  return (
            <Composer />
        )
}