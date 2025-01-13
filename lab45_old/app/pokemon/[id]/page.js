
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

async function fetchPokemonDetails(id) {
  if (isNaN(id) || id < 1 || id > 10277) {
    console.warn(`Invalid Pokémon ID: ${id}. ID must be between 1 and 10277.`);
    return null;  
  }

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    if (!res.ok) {
      console.error(`Failed to fetch Pokémon details for ID: ${id}. Status: ${res.status}`);
      return null;  
    }

    const data = await res.json();

    if (!data || !data.id || !data.name || !data.sprites || !data.types) {
      console.error(`Incomplete data for Pokémon with ID: ${id}`);
      return null;  
    }

    return data;  
  } catch (error) {
    console.error('Error during fetching Pokémon details:', error);
    return null;  
  }
}

export default async function PokemonDetailsPage({ params }) {
  const { id } = params;

  if (isNaN(id) || id < 1 || id > 10277) {
    return <div>Invalid Pokémon ID. Please provide an ID between 1 and 10277.</div>;
  }

  const details = await fetchPokemonDetails(id);

  if (!details) {
    return <div>Sorry, we couldn't find that Pokémon or there was an error fetching details.</div>;
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





// export default async function PokemonDetailsPage({ params }) {
//   const { id } = params;
//   if (isNaN(id) || id < 1 || id > 10277) {
//       // console.error(`Invalid Pokémon ID: ${id}. ID must be between 1 and 10277.`);
//       setLoading(false);
//       return;
//     }

//   const details = await fetchPokemonDetails(id);

//   if (!details) {
//     return <div>Sorry, we couldn't find that Pokémon.</div>;
//   }

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

// 'use client'
// import React, { useState, useEffect } from 'react';
// import PokemonDetails from '../../components/PokemonDetails';

// async function fetchPokemonDetails(id) {
//   if (isNaN(id) || id < 1 || id > 10277) { 
//     console.warn(`Invalid Pokémon ID: ${id}. ID must be between 1 and 10277.`); 
//     return { error: 'invalid_id' }; 
//   }

//   try {
//     const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

//     if (!res.ok) {
//       console.error(`Failed to fetch Pokémon details for ID: ${id}. Status: ${res.status}`);
//       return { error: 'not_found' }; 
//     }

//     const data = await res.json();

//     if (!data || !data.id || !data.name || !data.sprites || !data.types) {
//       console.error(`Incomplete data for Pokémon with ID: ${id}`);
//       return { error: 'incomplete_data' };
//     }

//     return data; 
//   } catch (error) {
//     console.error('Error during fetching Pokémon details:', error);
//     return null; 
//   }
// }

// // Server component (default in `app/` directory)
// export default async function PokemonDetailsPage({ params }) {
//   const { id } = params;

//   // Fetch Pokémon details
//   const details = await fetchPokemonDetails(id);

//   if (!details) {
//     return <div>Sorry, we couldn't find that Pokémon.</div>;
//   }

//   // Format data for the component
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



// Server component (default in `app/` directory)