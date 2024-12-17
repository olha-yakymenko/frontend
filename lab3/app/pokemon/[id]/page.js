
import PokemonDetails from '../../components/PokemonDetails';
import '../../../styles/2.css'
// Funkcja do pobierania pełnych danych o Pokémonie (szczegóły)
async function fetchPokemonDetails(id) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    // Sprawdzamy, czy odpowiedź jest poprawna
    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }

    const data = await res.json();
    return data;

  } catch (error) {
    console.error('Błąd podczas pobierania danych o Pokémonie:', error);
    return null; // Możesz zwrócić null lub domyślne dane w przypadku błędu
  }
}


export default async function PokemonDetailsPage({ params }) {
  // Pobieramy dane o Pokémonie na serwerze
  const details = await fetchPokemonDetails(params.id);
  
  // Przekształcamy dane na format, który będzie wygodny dla komponentu
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
