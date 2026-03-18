import { useEffect, useState } from 'react'
import PokemonCard from './components/PokemonCard'

function App() {
  const [pokemonData, setPokemonData] = useState([])
  const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/'

  const fetchPokemons = async(id) =>{
    try {
      const response = await fetch(`${BASE_URL}${id}`)
      const data = await response.json()
      setPokemonData((prevPokemon)=> [...prevPokemon, data])
    } catch (error) {
      console.error('Error con fetch pokemons')
    }
  }

  const fetchAllPokemons = () =>{
    for(let i =1; i<=60; i++){
      fetchPokemons(i)
    }
  }

 
  useEffect(() =>{
      fetchAllPokemons()
  },[])
  return (
    <>
     <h1 className='text-4xl font-semibold text-center my-6'>POKE API DEMO</h1>
    <div className='px-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {pokemonData
            .slice() // ✅ clonamos para no mutar el estado
            .filter((pokemon, index, self) => index === self.findIndex(p => p.id === pokemon.id))
            .sort((a, b) => a.id - b.id) // orden ascendente
            .map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemonData={pokemon} />
            ))}
        </div>
    </div>
     
    </>
  )
}

export default App
