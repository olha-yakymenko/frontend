import '../../styles/2.css'
import Link from 'next/link';
export default function PokemonList({ pokemons }) {
  console.log(pokemons)
  return (
    <div>
      <ul>
        {pokemons.map(pokemon => {
          const pokemonId = pokemon.id
          console.log(pokemonId)
          return (
            <li key={pokemon.name}>
              <Link href={`/pokemon/${pokemonId}`}>
                <img src={pokemon.image} alt={pokemon.name} width={50} height={50} />
                <h3>{pokemon.name} (ID: {pokemonId})</h3>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
