'use client';

import { useState, useEffect } from 'react';

export default function ComparePage() {
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);
  const [selectedIds, setSelectedIds] = useState({ pokemon1Id: null, pokemon2Id: null });

  useEffect(() => {
    const savedPokemons = JSON.parse(localStorage.getItem('comparison')) || [];

    if (savedPokemons.length < 2) {
      return;
    }

    if (selectedIds.pokemon1Id !== null) {
      setPokemon1(savedPokemons[selectedIds.pokemon1Id]);
    }

    if (selectedIds.pokemon2Id !== null) {
      setPokemon2(savedPokemons[selectedIds.pokemon2Id]);
    }
  }, [selectedIds]);

  const handleSelectPokemon = (pokemonIndex, pokemonId) => {
    setSelectedIds((prev) => ({
      ...prev,
      [pokemonIndex]: pokemonId,
    }));
  };

  return (
    <div>
      <h1>Compare Two Pokémon</h1>

      <div>
        <h2>Select Pokémon to Compare</h2>
        <div>
          <select
            onChange={(e) => handleSelectPokemon('pokemon1Id', e.target.value)}
            value={selectedIds.pokemon1Id || ''}
          >
            <option value="" disabled>Select Pokémon 1</option>
            {JSON.parse(localStorage.getItem('comparison') || '[]').map((pokemon, index) => (
              <option key={index} value={index}>
                {pokemon.name}
              </option>
            ))}
          </select>

          <select
            onChange={(e) => handleSelectPokemon('pokemon2Id', e.target.value)}
            value={selectedIds.pokemon2Id || ''}
          >
            <option value="" disabled>Select Pokémon 2</option>
            {JSON.parse(localStorage.getItem('comparison') || '[]').map((pokemon, index) => (
              <option key={index} value={index}>
                {pokemon.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="pokemon-comparison">
        {pokemon1 && pokemon2 ? (
          <div className="comparison-details">
            <div className="pokemon">
              <h2>{pokemon1.name}</h2>
              <img src={pokemon1.image} alt={pokemon1.name} />
              <p>Types: {pokemon1.types.join(', ')}</p>
              <p>Weight: {pokemon1.weight}</p>
              <p>Height: {pokemon1.height}</p>
            </div>
            <div className="vs">VS</div>
            <div className="pokemon">
              <h2>{pokemon2.name}</h2>
              <img src={pokemon2.image} alt={pokemon2.name} />
              <p>Types: {pokemon2.types.join(', ')}</p>
              <p>Weight: {pokemon2.weight}</p>
              <p>Height: {pokemon2.height}</p>
            </div>
          </div>
        ) : (
          <p>Select two Pokémon to compare.</p>
        )}
      </div>
    </div>
  );
}
