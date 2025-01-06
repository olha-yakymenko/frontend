// 'use client'
// import { useState, useEffect } from 'react';
// import PokemonList from '../components/PokemonList';
// async function fetchPokemon(limit, offset = 0) {
//   const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
//   const data = await res.json();
//   return data.results;
// }

// export default function PokemonPage() {
//   const [pokemons, setPokemons] = useState([]);
//   const [filteredPokemons, setFilteredPokemons] = useState([]);
//   const [type, setType] = useState('');
//   const [search, setSearch] = useState('');
//   const [limit, setLimit] = useState(20);
//   const [offset, setOffset] = useState(0); // Do paginacji
//   const [totalPokemons, setTotalPokemons] = useState(0); // Całkowita liczba Pokémonów

//   // Funkcja do ustawienia filtrów na podstawie URL
//   const setFiltersFromURL = () => {
//     const params = new URLSearchParams(window.location.search);
//     const urlType = params.get('type');
//     const urlSearch = params.get('search');
//     const urlLimit = params.get('limit');

//     if (urlType) setType(urlType);
//     if (urlSearch) setSearch(urlSearch);
//     if (urlLimit) setLimit(parseInt(urlLimit));
//   };

//   // Funkcja do aktualizacji URL
//   const handleFilterChange = (field, value) => {
//     const currentParams = new URLSearchParams(window.location.search);
//     currentParams.set(field, value);
//     window.history.pushState({}, '', `${window.location.pathname}?${currentParams.toString()}`);
//   };

//   // Funkcja filtrująca pokemony na podstawie parametrów
//   const filterPokemons = () => {
//     let filtered = pokemons;

//     // Filtrujemy po nazwie
//     if (search) {
//       filtered = filtered.filter(pokemon => pokemon.name.toLowerCase().includes(search.toLowerCase()));
//     }

//     // Filtrujemy po typie
//     if (type) {
//       filtered = filtered.filter(pokemon => pokemon.types.includes(type));
//     }

//     setFilteredPokemons(filtered);
//   };

//   // Pobieranie danych Pokémonów
//   useEffect(() => {
//     const fetchAndSetPokemons = async () => {
//       const pokemons = await fetchPokemon(limit, offset);
//       const filtered=pokemons.filter(pok => pok !== null)
//       // Pobieramy szczegóły każdego Pokémona
//       const pokemonsWithDetails = await Promise.all(filtered.map(async (pokemon) => {
//         const res = await fetch(pokemon.url);
//         const details = await res.json();
//         return {
//           id: details.id,
//           name: details.name,
//           image: details.sprites.front_default,
//           types: details.types.map((t) => t.type.name), // Dodajemy typy Pokémona
//         };
//       }));

//       setPokemons(pokemonsWithDetails);

//       // Pobierz całkowitą liczbę Pokémonów
//       const countRes = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1');
//       const countData = await countRes.json();
//       setTotalPokemons(countData.count); // Całkowita liczba Pokémonów
//     };

//     fetchAndSetPokemons();
//   }, [limit, offset]);

//   // Aktualizujemy filtry i wyniki po załadowaniu komponentu
//   useEffect(() => {
//     setFiltersFromURL();
//   }, []);

//   // Filtrujemy pokemony po każdej zmianie w filtrach
//   useEffect(() => {
//     filterPokemons();
//   }, [search, type, limit, offset, pokemons]); // Filtruj po każdej zmianie w filtrach i danych

//   // Zaktualizuj stan po zmianach w polu wyszukiwania
//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearch(value);
//     handleFilterChange('search', value); // Zaktualizuj URL
//   };

//   // Zaktualizuj stan po zmianach w polu typu
//   const handleTypeChange = (e) => {
//     const value = e.target.value;
//     setType(value);
//     handleFilterChange('type', value); // Zaktualizuj URL
//   };

//   // Zaktualizuj stan po zmianach w limicie
//   // const handleLimitChange = (e) => {
//   //   const value = e.target.value;
//   //   if (value === 'all') {
//   //     setLimit(totalPokemons); // Wyświetl wszystkie Pokémony
//   //   } else {
//   //     setLimit(parseInt(value)); // Ustaw wybrany limit
//   //   }
//   //   handleFilterChange('limit', value); // Zaktualizuj URL
//   // };

//   const handleLimitChange = (e) => {
//     const value = e.target.value;
//     console.log("VAlue", value);
  
//     // Jeśli wybrano "all", ustaw limit na totalPokemons, ale tylko jeśli jest to poprawna liczba
//     if (value === 'all') {
//       if (totalPokemons && !isNaN(totalPokemons)) {
//         setLimit(totalPokemons); // Ustaw limit na całkowitą liczbę Pokémonów
//       } else {
//         setLimit(100); // W przypadku błędu, ustaw domyślny limit (np. 100)
//       }
//     } else {
//       const newLimit = parseInt(value, 10); // Przekształć na liczbę
//       if (!isNaN(newLimit)) {
//         setLimit(newLimit); // Ustaw wybrany limit, jeśli jest liczbą
//       } else {
//         setLimit(20); // Jeśli wartość nie jest liczbą, ustaw domyślny limit (np. 20)
//       }
//     }
  
//     handleFilterChange('limit', value); // Zaktualizuj URL
//   };
  

//   return (
//     <div>
//       <h1>Pokémon List</h1>

//       <input
//         type="text"
//         value={search}
//         onChange={handleSearchChange}
//         placeholder="Search Pokémon"
//       />
//       <select value={type} onChange={handleTypeChange}>
//         <option value="">All Types</option>
//         <option value="fire">Fire</option>
//         <option value="water">Water</option>
//         <option value="grass">Grass</option>
//         <option value="normal">Normal</option>
//       </select>
//       <select value={limit} onChange={handleLimitChange}>
//         <option value="20">20 results</option>
//         <option value="50">50 results</option>
//         <option value="100">100 results</option>
//         <option value="all">Aaall results</option> 
//       </select>

//       <PokemonList pokemons={filteredPokemons} />
//     </div>
//   );
// }




// 'use client'
// import { useState, useEffect } from 'react';
// import PokemonList from '../components/PokemonList';

// async function fetchPokemon(limit, offset = 0) {
//   const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
//   const data = await res.json();
//   return data.results;
// }

// export default function PokemonPage() {
//   const [pokemons, setPokemons] = useState([]);
//   const [filteredPokemons, setFilteredPokemons] = useState([]);
//   const [type, setType] = useState('');
//   const [search, setSearch] = useState('');
//   const [limit, setLimit] = useState(20); // Default limit
//   const [offset, setOffset] = useState(0); // For pagination
//   const [totalPokemons, setTotalPokemons] = useState(0); // Total number of Pokémon

//   // Function to set filters from localStorage and URL
//   const setFiltersFromLocalStorageAndURL = () => {
//     const savedType = localStorage.getItem('type');
//     console.log("type", savedType )
//     const savedSearch = localStorage.getItem('search');
//     const savedLimit = localStorage.getItem('limit');
//     console.log("saved limit", savedLimit)
//     const urlParams = new URLSearchParams(window.location.search);
    
//     // Load values from URL if present
//     const urlLimit = urlParams.get('limit');
//     const urlType = urlParams.get('type');
//     const urlSearch = urlParams.get('search');

//     if (urlSearch) setSearch(urlSearch);
//     if (urlType) setType(urlType);
//     // if (urlLimit) {
//     //   setLimit(parseInt(urlLimit)); // Override with URL limit
//     // } else if (savedLimit) {
//     //   setLimit(parseInt(savedLimit)); // Otherwise use localStorage value
//     // } else {
//     //   setLimit(20); // Default value
//     // }
//     if (savedLimit) {
//         setLimit(parseInt(savedLimit));}

//     if (savedType) setType(savedType);
//     if (savedSearch) setSearch(savedSearch);
//   };

//   // Function to save filters to localStorage and update URL
//   const saveFiltersToLocalStorageAndURL = () => {
//     localStorage.setItem('type', type);
//     localStorage.setItem('search', search);
//     localStorage.setItem('limit', limit.toString());
//     console.log("LIMIT",limit)

//     const currentParams = new URLSearchParams(window.location.search);
//     currentParams.set('type', type);
//     currentParams.set('search', search);
//     currentParams.set('limit', limit.toString());
//     window.history.pushState({}, '', `${window.location.pathname}?${currentParams.toString()}`);
//   };

//   // Filter Pokémon based on the current filters
//   const filterPokemons = () => {
//     let filtered = pokemons;

//     // Filter by search query
//     if (search) {
//       filtered = filtered.filter(pokemon => pokemon.name.toLowerCase().includes(search.toLowerCase()));
//     }

//     // Filter by type
//     if (type) {
//       filtered = filtered.filter(pokemon => pokemon.types.includes(type));
//     }

//     setFilteredPokemons(filtered);
//   };

//   // Fetch Pokémon data
//   useEffect(() => {
//     const fetchAndSetPokemons = async () => {
//       const pokemons = await fetchPokemon(limit, offset);
//       const filtered = pokemons.filter(pok => pok !== null);
      
//       // Fetch details for each Pokémon
//       const pokemonsWithDetails = await Promise.all(filtered.map(async (pokemon) => {
//         const res = await fetch(pokemon.url);
//         const details = await res.json();
//         return {
//           id: details.id,
//           name: details.name,
//           image: details.sprites.front_default,
//           types: details.types.map((t) => t.type.name), // Add Pokémon types
//         };
//       }));

//       setPokemons(pokemonsWithDetails);

//       // Get the total number of Pokémon
//       const countRes = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1');
//       const countData = await countRes.json();
//       setTotalPokemons(countData.count); // Total number of Pokémon
//     };

//     fetchAndSetPokemons();
//   }, [limit, offset]);

//   // Load filters from localStorage and URL when the component is mounted
//   useEffect(() => {
//     setFiltersFromLocalStorageAndURL();
//   }, []);

//   // Filter Pokémon whenever search, type, or limit changes
//   useEffect(() => {
//     if (pokemons.length > 0) {
//       filterPokemons();
//     }
//   }, [search, type, pokemons]); // Trigger only when search, type, or pokemons change

//   // Save filters to localStorage and URL after each change
//   useEffect(() => {
//     saveFiltersToLocalStorageAndURL(); // Save filters after any change
//   }, [search, type, limit]); // Trigger only when search, type, or limit change

//   // Update state when search changes
//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearch(value);
//   };

//   // Update state when type changes
//   const handleTypeChange = (e) => {
//     const value = e.target.value;
//     setType(value);
//   };

//   // Update state when limit changes
//   const handleLimitChange = (e) => {
//     const value = e.target.value;

//     // If "all" is selected, set limit to totalPokemons if valid
//     if (value === 'all') {
//       if (totalPokemons && !isNaN(totalPokemons)) {
//         setLimit(totalPokemons);
//       } else {
//         setLimit(100); // Default to 100 if totalPokemons is invalid
//       }
//     } else {
//       const newLimit = parseInt(value, 10);
//       if (!isNaN(newLimit)) {
//         setLimit(newLimit);
//        } 
//       //else {
//       //   setLimit(20); // Default to 20 if input is invalid
//       // }
//     }
//   };

//   return (
//     <div>
//       <h1>Pokémon List</h1>

//       <input
//         type="text"
//         value={search}
//         onChange={handleSearchChange}
//         placeholder="Search Pokémon"
//       />
//       <select value={type} onChange={handleTypeChange}>
//         <option value="">All Types</option>
//         <option value="fire">Fire</option>
//         <option value="water">Water</option>
//         <option value="grass">Grass</option>
//         <option value="normal">Normal</option>
//       </select>
//       <select value={limit} onChange={handleLimitChange}>
//         <option value="20">20 results</option>
//         <option value="50">50 results</option>
//         <option value="100">100 results</option>
//         <option value="all">All results</option> 
//       </select>

//       <PokemonList pokemons={filteredPokemons} />
//     </div>
//   );
// }





'use client';
import { useState, useEffect } from 'react';
import PokemonList from '../components/PokemonList';

async function fetchPokemon(limit, offset = 0) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  const data = await res.json();
  return data.results;
}

export default function PokemonPage() {
  const initialLimit = () => {
    const savedLimit = localStorage.getItem('limit');
    const urlParams = new URLSearchParams(window.location.search);
    const urlLimit = urlParams.get('limit');
    if (urlLimit) return parseInt(urlLimit, 10);
    if (savedLimit && !isNaN(savedLimit)) return parseInt(savedLimit, 10);
    return 20; 
  };

  const initialType = () => {
    const savedType = localStorage.getItem('type');
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('type') || savedType || '';
  };

  const initialSearch = () => {
    const savedSearch = localStorage.getItem('search');
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('search') || savedSearch || '';
  };

  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [type, setType] = useState(initialType);
  const [search, setSearch] = useState(initialSearch);
  const [limit, setLimit] = useState(initialLimit);
  const [offset, setOffset] = useState(0); // Paginacja
  const [totalPokemons, setTotalPokemons] = useState(0);

  const saveFiltersToLocalStorageAndURL = () => {
    localStorage.setItem('type', type);
    localStorage.setItem('search', search);
    localStorage.setItem('limit', limit.toString());

    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set('type', type);
    currentParams.set('search', search);
    currentParams.set('limit', limit.toString());
    window.history.pushState({}, '', `${window.location.pathname}?${currentParams.toString()}`);
  };

  const filterPokemons = () => {
    let filtered = pokemons;

    if (search) {
      filtered = filtered.filter(pokemon => pokemon.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (type) {
      filtered = filtered.filter(pokemon => pokemon.types.includes(type));
    }

    setFilteredPokemons(filtered);
  };

  useEffect(() => {
    const fetchAndSetPokemons = async () => {
      const pokemons = await fetchPokemon(limit, offset);
      const filtered = pokemons.filter(pok => pok !== null);

      const pokemonsWithDetails = await Promise.all(
        filtered.map(async pokemon => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return {
            id: details.id,
            name: details.name,
            image: details.sprites.front_default,
            types: details.types.map(t => t.type.name),
          };
        })
      );

      setPokemons(pokemonsWithDetails);

      const countRes = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1');
      const countData = await countRes.json();
      setTotalPokemons(countData.count);
    };

    fetchAndSetPokemons();
  }, [limit, offset]);

  useEffect(() => {
    filterPokemons();
  }, [search, type, pokemons]);

  useEffect(() => {
    saveFiltersToLocalStorageAndURL();
  }, [search, type, limit]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleLimitChange = (e) => {
    const value = e.target.value;

    // if (value === 'all') {
    //   if (totalPokemons && !isNaN(totalPokemons)) {
    //     setLimit(totalPokemons);
    //   } else {
    //     setLimit(100); 
    //   }
    // } else 
    // {
      const newLimit = parseInt(value, 10);
      if (!isNaN(newLimit)) {
        setLimit(newLimit);
      // }
    }
  };

  return (
    <div>
      <h1>Pokémon List</h1>
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search Pokémon"
      />
      <select value={type} onChange={handleTypeChange}>
        <option value="">All Types</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
        <option value="grass">Grass</option>
        <option value="normal">Normal</option>
      </select>
      <select value={limit} onChange={handleLimitChange}>
        <option value="20">20 results</option>
        <option value="50">50 results</option>
        <option value="100">100 results</option>
        <option value="1000000">All results</option>
      </select>

      <PokemonList pokemons={filteredPokemons} />
    </div>
  );
}
