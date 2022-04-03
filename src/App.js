import React, { useState, useEffect } from "react";
import PokemonThumbNail from "./components/PokemonThumbNail";
import "./App.css";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );

  const getPokemons = async () => {
    const resp = await fetch(loadMore);
    const data = await resp.json();

    setLoadMore(data.next);

    const createPokemonObject = async (result) => {
      result.forEach(async (pokemon) => {
        const resp = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await resp.json();
        await setPokemons((currentList) => [...currentList, data]);
      });
    };
    createPokemonObject(data.results);
  };
  useEffect( async() => {
    await getPokemons();
  });

  return (
    <div className="app-container">
      <h1 className="title">Pokédex</h1>
      <div className="pokemon-container">
        <div className="all-container">
          {pokemons
            .sort((a, b) => (a.id > b.id ? 1 : -1))
            .map((pokemon, id) => {
              return (
                <PokemonThumbNail
                  id={pokemon.id}
                  name={pokemon.name}
                  image={pokemon.sprites.other.dream_world.front_default}
                  type={pokemon.types[0].type.name}
                  key={id}
                />
              );
            })}
        </div>
      </div>
      <button onClick={() => getPokemons()} type="button">
        Load more
      </button>
    </div>
  );
}

export default App;
