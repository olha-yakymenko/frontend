import Link from 'next/link';

async function fetchPokemonName(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();
  return data.name; 
}

export default async function Breadcrumbs({ id }) {
  const pokemonName = await fetchPokemonName(id); 

  return (
    <nav>
      <ol style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li style={{ margin: '0 8px' }}>&gt;</li>
        <li>
          <Link href="/pokemon">Pokemon</Link>
        </li>
        <li style={{ margin: '0 8px' }}>&gt;</li>
        <li>{pokemonName}</li>
      </ol>
    </nav>
  );
}