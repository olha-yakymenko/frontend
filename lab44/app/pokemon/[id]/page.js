
// import PokemonDetails from '../../components/PokemonDetails';
// // Funkcja do pobierania pełnych danych o Pokémonie (szczegóły)
// async function fetchPokemonDetails(id) {
//   try {
//     const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

//     // Sprawdzamy, czy odpowiedź jest poprawna
//     if (!res.ok) {
//       console.log("Wystapil blad pokemon/page");
//     }

//     const data = await res.json();
//     return data;

//   } catch (error) {
//     console.error('Błąd podczas pobierania danych o Pokémonie:', error);
//     return null; // Możesz zwrócić null lub domyślne dane w przypadku błędu
//   }
// }


// export default async function PokemonDetailsPage({ params }) {
//   // Pobieramy dane o Pokémonie na serwerze
//   console.log("ID", params.id)
//   //console.log(params.split("/").filter(Boolean).pop())
//   const details = await fetchPokemonDetails(params.id);
  
//   // Przekształcamy dane na format, który będzie wygodny dla komponentu
//   const pokemonData = {
//     id: details.id,
//     name: details.name,
//     image: details.sprites.front_default,
//     types: details.types.map(t => t.type.name),
//     stats: details.stats,
//     weight: details.weight,
//     height: details.height
//   };

//   return <PokemonDetails pokemon={pokemonData} />;
// }

import PokemonDetails from '../../components/PokemonDetails';

// Function to fetch Pokémon details
// async function fetchPokemonDetails(id) {
//   try {
//     const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    
//     if (!res.ok) {
//       throw new Error("Wystapil blad pokemon/page");
//     }

//     const data = await res.json();
//     return data;

//   } catch (error) {
//     console.error('Błąd podczas pobierania danych o Pokémonie:', error);
//     return null; // Return null or default data on error
//   }
// }

async function fetchPokemonDetails(id) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    if (!res.ok) {
      console.error(`Failed to fetch Pokémon details for ID: ${id}. Status: ${res.status}`);
      throw new Error(`Failed to fetch details for Pokémon with ID ${id}`);
    }

    const data = await res.json();

    if (!data || !data.id || !data.name || !data.sprites || !data.types) {
      throw new Error(`Missing data for Pokémon with ID: ${id}`);
    }

    return data;
  } catch (error) {
    console.error('Error during fetching Pokémon details:', error);
    return null; 
  }
}


export default async function PokemonDetailsPage({ params }) {
  const { id } = params;

  const details = await fetchPokemonDetails(id);

  if (!details) {
    return <div>Sorry, we couldn't find that Pokémon.</div>;
  }

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



// import PokemonDetails from '../../components/PokemonDetails';

// // Funkcja do pobierania pełnych danych o Pokémonie (szczegóły)
// async function fetchPokemonDetails(id) {
//   try {
//     const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

//     // Sprawdzamy, czy odpowiedź jest poprawna
//     if (!res.ok) {
//       throw new Error(`Error: ${res.statusText}`);
//     }

//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.error('Błąd podczas pobierania danych o Pokémonie:', error);
//     return null; // Możesz zwrócić null lub domyślne dane w przypadku błędu
//   }
// }

// export default async function PokemonDetailsPage({ params }) {
//   // Upewniamy się, że params zostało poprawnie odczytane
//   if (!params || !params.id) {
//     return <div>Invalid Pokémon ID.</div>;
//   }

//   // Pobieramy dane o Pokémonie
//   const details = await fetchPokemonDetails(params.id);

//   // Obsługa braku danych
//   if (!details) {
//     return <div>Pokémon data not found. Please check the ID.</div>;
//   }

//   // Przekształcamy dane na format, który będzie wygodny dla komponentu
//   const pokemonData = {
//     id: details.id,
//     name: details.name,
//     image: details.sprites.front_default,
//     types: details.types,
//     stats: details.stats,
//     weight: details.weight,
//     height: details.height,
//   };

//   return <PokemonDetails pokemon={pokemonData} />;
// }
