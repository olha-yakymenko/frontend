
// 'use client';

// import { useState, useEffect } from 'react';

// export default function PokemonDetails({ pokemon }) {
//   const [favorites, setFavorites] = useState([]);
//   const [comparison, setComparison] = useState([]);
//   const [message, setMessage] = useState(''); 
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
//       setFavorites(storedFavorites);

//       const storedComparison = JSON.parse(localStorage.getItem('comparison') || '[]');
//       setComparison(storedComparison);
//     }
//   }, []);

//   const handleFavorite = () => {
//     let updatedFavorites;
//     if (favorites.some(fav => fav.name === pokemon.name)) {
//       updatedFavorites = favorites.filter(fav => fav.name !== pokemon.name);
//     } else {
//       updatedFavorites = [...favorites, { id: pokemon.id, image: pokemon.image, name: pokemon.name }];
//     }

//     setFavorites(updatedFavorites);
//     if (typeof window !== 'undefined') {
//       localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
//     }
//   };

//   const handleComparison = () => {
//     let updatedComparison;
//     if (comparison.some(comp => comp.name === pokemon.name)) {
//       updatedComparison = comparison.filter(comp => comp.name !== pokemon.name);
//     } else {
//       if (comparison.length >= 2) {
//         // alert('Możesz porównać maksymalnie 2 Pokémony.');
//         // return;
//         setMessage('Możesz porównać maksymalnie 2 Pokémony.'); // Ustaw komunikat
//       return;

//       }
//       updatedComparison = [...comparison, { id: pokemon.id, image: pokemon.image, name: pokemon.name, height: pokemon.height, weight: pokemon.weight, types: pokemon.types, stats: pokemon.stats }];
//     }

//     setComparison(updatedComparison);
//     if (typeof window !== 'undefined') {
//       localStorage.setItem('comparison', JSON.stringify(updatedComparison));
//     }
//   };

//   const isFavorite = favorites.some(fav => fav.name === pokemon.name);
//   const isInComparison = comparison.some(comp => comp.name === pokemon.name);

//   // if (!pokemon) return <div>Loading...</div>;

//   return (
//     <div className="pokemon-details active">
//       <h1>{pokemon.id}</h1>
//       <h3>{pokemon.name}</h3>
//       <img src={pokemon.image} alt={pokemon.name} />
//       <h2>Typy:</h2>
//       <ul>
//         {pokemon.types.length > 0 ? (
//           pokemon.types.map((type, id) => <li key={id}>{type}</li>)
//         ) : (
//           <li>Brak dostępnych typów dla tego Pokémona.</li>
//         )}
//       </ul>
//       <h2>Statystyki:</h2>
//       <ul>
//         {pokemon.stats.length > 0 ? (
//           pokemon.stats.map((stat, id) => (
//             <li key={id}>{stat.stat.name}: {stat.base_stat}</li>
//           ))
//         ) : (
//           <li>Brak dostępnych statystyk dla tego Pokémona.</li>
//         )}
//       </ul>
//       <h2>Wzrost:</h2>
//       <p>{pokemon.height ? pokemon.height : "Brak danych"}</p>
//       <h2>Waga:</h2>
//       <p>{pokemon.weight ? pokemon.weight : "Brak danych"}</p>

//       <button onClick={handleFavorite}>
//         {isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
//       </button>
//       <button onClick={handleComparison}>
//       {message && <p style={{ color: 'red' }}>{message}</p>}
//         {isInComparison ? 'Usuń z porównania' : 'Dodaj do porównania'}
//       </button>
//     </div>
//   );
// }






'use client';

import { useState, useEffect } from 'react';
import Note from './Note.js';

export default function PokemonDetails({ pokemon }) {
  const [favorites, setFavorites] = useState([]);
  const [comparison, setComparison] = useState([]);
  const [message, setMessage] = useState(''); 

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  //     setFavorites(storedFavorites);

  //     const storedComparison = JSON.parse(localStorage.getItem('comparison') || '[]');
  //     setComparison(storedComparison);
  //   }
  // }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Funkcja zabezpieczająca przed błędami JSON.parse
      const safeParse = (key) => {
        try {
          const data = localStorage.getItem(key);
          return data ? JSON.parse(data) : [];
        } catch (e) {
          console.error(`Błąd podczas parsowania danych z localStorage dla klucza ${key}:`, e);
          return []; // Zwracamy pustą tablicę w przypadku błędu
        }
      };
  
      // Używamy safeParse, żeby uniknąć błędów
      const storedFavorites = safeParse('favorites');
      setFavorites(storedFavorites);
      console.log(storedFavorites)
      console.log(storedFavorites.length)
  
      const storedComparison = safeParse('comparison');
      setComparison(storedComparison);
    }
  }, []);
  

  const handleFavorite = () => {
    let updatedFavorites;
    if (favorites.some(fav => fav.name === pokemon.name)) {
      updatedFavorites = favorites.filter(fav => fav.name !== pokemon.name);
    } else {
      updatedFavorites = [...favorites, { id: pokemon.id, image: pokemon.image, name: pokemon.name }];
    }

    setFavorites(updatedFavorites);
    if (typeof window !== 'undefined') {
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    
    }
  };

  const handleComparison = () => {
    let updatedComparison;
    if (comparison.some(comp => comp.name === pokemon.name)) {
      updatedComparison = comparison.filter(comp => comp.name !== pokemon.name);
    } else {
      if (comparison.length >= 2) {
        setMessage('Możesz porównać maksymalnie 2 Pokémony.');
        return;
      }
      updatedComparison = [...comparison, { id: pokemon.id, image: pokemon.image, name: pokemon.name, height: pokemon.height, weight: pokemon.weight, types: pokemon.types, stats: pokemon.stats }];
    }

    setComparison(updatedComparison);
    if (typeof window !== 'undefined') {
      localStorage.setItem('comparison', JSON.stringify(updatedComparison));
    }
  };

  const isFavorite = favorites.some(fav => fav.name === pokemon.name);
  const isInComparison = comparison.some(comp => comp.name === pokemon.name);

  return (
    <div className="pokemon-details active">
      <h1>{pokemon.id}</h1>
      <h3>{pokemon.name}</h3>
      <img src={pokemon.image} alt={pokemon.name} />
      <h2>Typy:</h2>
      <ul>
        {pokemon.types.length > 0 ? (
          pokemon.types.map((type, id) => <li key={id}>{type}</li>)
        ) : (
          <li>Brak dostępnych typów dla tego Pokémona.</li>
        )}
      </ul>
      <h2>Statystyki:</h2>
      <ul>
        {pokemon.stats.length > 0 ? (
          pokemon.stats.map((stat, id) => (
            <li key={id}>{stat.stat.name}: {stat.base_stat}</li>
          ))
        ) : (
          <li>Brak dostępnych statystyk dla tego Pokémona.</li>
        )}
      </ul>
      <h2>Wzrost:</h2>
      <p>{pokemon.height ? pokemon.height : "Brak danych"}</p>
      <h2>Waga:</h2>
      <p>{pokemon.weight ? pokemon.weight : "Brak danych"}</p>

      <button onClick={handleFavorite}>
        {isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
      </button>
      <button onClick={handleComparison}>
        {message && <p style={{ color: 'red' }}>{message}</p>}
        {isInComparison ? 'Usuń z porównania' : 'Dodaj do porównania'}
      </button>

      {/* Komponent Note powinien być renderowany wewnątrz JSX */}
      <Note pokemon={pokemon} />
    </div>
  );
}
