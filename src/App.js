import React, { useState, useEffect } from 'react'
import PokemonThumbNail from './components/PokemonThumbNail';
import Button from '@material-ui/core/Button';
import './App.css';

function App() {
  const [allPokemons, setAllPokemons] = useState([])
  const [loadMore, setLoadMore] = useState("https://pokeapi.co/api/v2/pokemon?limit=20")

  const getPokemons = async () => {
    const resp = await fetch(loadMore)
    const data = await resp.json()

    setLoadMore(data.next)
    
    function createPokemonObject (result) {
      result.forEach(async (pokemon) => {
        const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        const data = await resp.json();
     
        setAllPokemons(currentList => [...currentList, data]);
     });
    }
      createPokemonObject(data.results)
  };

  useEffect(() =>{
    getPokemons()
  }, [])

  return (
    <div className="app-container">
      <h1 className="title">Pokédex</h1>
      <div className="pokemon-container">
        <div className="all-container">
          {allPokemons.sort((a, b) => a.id > b.id? 1 : -1).map((pokemon, index) => 
            <PokemonThumbNail 
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.sprites.other.dream_world.front_default}
              type={pokemon.types[0].type.name}
              key={index}
            />
          )}
        </div>
        <Button onClick={() => getPokemons()} className="load-more">
          Load more
        </Button>
      </div>
    </div>
  );
}

export default App;
