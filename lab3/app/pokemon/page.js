
import PokemonList from '../components/PokemonList';

async function fetchPokemons(limit, offset = 0) {
  // Tworzymy zapytanie do API z parametrami limit i offset
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  const res = await fetch(url);
  const data = await res.json();

  // Pobieramy dane o każdym Pokémonie
  const pokemonsWithDetails = await Promise.all(
    data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const details = await res.json();
      return {
        id: details.id,
        name: details.name,
        image: details.sprites.front_default,
        types: details.types.map((t) => t.type.name),
      };
    })
  );

  return {
    pokemons: pokemonsWithDetails
  };
}

async function fetchAllPokemons() {
  const limit = 100; // Maksymalna liczba Pokémonów, które można pobrać w jednym żądaniu.
  let offset = 0; // Początkowy offset.
  let allPokemons = [];
  let hasMore = true;

  while (hasMore) {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.error(`HTTP error! status: ${res.status}`);
        break; // Jeśli odpowiedź jest błędna, przerywamy pętlę.
      }
      const data = await res.json();

      // Pobieramy szczegóły dla każdego Pokémona.
      const detailedPokemons = await Promise.all(
        data.results.filter(pokemon => pokemon !== null).map(async (pokemon) => {
          const detailsRes = await fetch(pokemon.url);
          const details = await detailsRes.json();
          return {
            id: details.id,
            name: details.name,
            image: details.sprites.front_default,
            types: details.types.map((t) => t.type.name),
          };
        })
      );

      // Dodajemy szczegóły Pokémonów do listy.
      allPokemons = allPokemons.concat(detailedPokemons);

      // Sprawdzamy, czy jest więcej Pokémonów do pobrania.
      hasMore = data.results.length === limit;
      offset += limit; // Zwiększamy offset na kolejną partię.
    } catch (error) {
      console.error(`Error fetching Pokémon: ${error.message}`);
      break; // W przypadku błędu kończymy pętlę.
    }
  }

  // Zwracamy całą listę Pokémonów.
  return {
    pokemons: allPokemons
  };
}

export default async function PokemonPage({ searchParams }) {
  const { search = '', type = '', limit = '20' } = searchParams;

  let actualLimit = limit === 'All' ? null : parseInt(limit); // Ustaw `null` dla 'All', w przeciwnym razie liczba
  let pokemons = [];

  try {
    if (actualLimit === null) {
      // Pobieranie wszystkich Pokémonów
      const { pokemons: allPokemons } = await fetchAllPokemons();
      pokemons = allPokemons;
    } else {
      // Pobieranie ograniczonej liczby Pokémonów
      const result = await fetchPokemons(actualLimit);
      const { pokemons: limitedPokemons } = await fetchPokemons(actualLimit);
      pokemons = limitedPokemons;
    }

    // Filtracja Pokémonów po nazwie i typie
    const filteredPokemons = pokemons.filter((pokemon) => {
      const matchesName = pokemon.name.toLowerCase().includes(search.toLowerCase());
      const matchesType = type ? pokemon.types.includes(type) : true;
      return matchesName && matchesType;
    });

    return (
      <div>
        <h1>Pokémon List</h1>

        <form method="get">
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Search Pokémon"
          />
          <select name="type" defaultValue={type}>
            <option value="">All Types</option>
            <option value="fire">Fire</option>
            <option value="water">Water</option>
            <option value="grass">Grass</option>
            <option value="normal">Normal</option>
          </select>
          <select name="limit" defaultValue={limit}>
            <option value="20">20 results</option>
            <option value="50">50 results</option>
            <option value="100">100 results</option>
            <option value="All">All</option>
          </select>
          <button type="submit">Apply Filters</button>
        </form>

        <PokemonList pokemons={filteredPokemons} />
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch Pokémon:", error.message);

    return (
      <div>
        <h1>Pokémon List</h1>
        <p>Error fetching Pokémon. Please try again later.</p>
      </div>
    );
  }
}