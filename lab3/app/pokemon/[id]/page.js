
import PokemonDetails from '../../components/PokemonDetails';
import '../../../styles/2.css'
async function fetchPokemonDetails(id) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    if (!res.ok) {
      console.error(`Error: ${res.statusText}`);
    }

    const data = await res.json();
    return data;

  } catch (error) {
    console.error('Błąd podczas pobierania danych o Pokémonie:', error);
    return null; 
  }
}


export default async function PokemonDetailsPage({ params }) {
  const details = await fetchPokemonDetails(params.id);
  
  const pokemonData = {
    id: details.id,
    name: details.name,
    image: details.sprites.front_default,
    types: details.types.map(t => t.type.name),
    stats: details.stats,
    weight: details.weight,
    height: details.height
  };

  return <PokemonDetails pokemon={pokemonData} />;
}
