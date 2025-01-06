
'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import '../../css/1.css'

async function fetchPokemonName(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();
  return data.name; 
}

export default function Breadcrumbs({ id }) {
  const [pokemonName, setPokemonName] = useState('');

  useEffect(() => {
    const getPokemonName = async () => {
      const name = await fetchPokemonName(id);
      setPokemonName(name);
    };

    getPokemonName();
  }, [id]);  

  if (!pokemonName) return <div>Loading...</div>;

  return (
    <nav>
      <ol style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>&gt;</li>
        <li>
          <Link href="/pokemon">Pokemon</Link>
        </li>
        <li></li>
        <li>{pokemonName}</li>
      </ol>
    </nav>
  );
}
