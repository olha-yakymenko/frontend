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




//dziala
// 'use client';
// import { useState, useEffect } from 'react';
// import PokemonList from '../components/PokemonList';

// async function fetchPokemon(limit, offset = 0) {
//   const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
//   const data = await res.json();
//   return data.results;
// }

// export default function PokemonPage() {
//   const initialLimit = () => {
//     const savedLimit = localStorage.getItem('limit');
//     const urlParams = new URLSearchParams(window.location.search);
//     const urlLimit = urlParams.get('limit');
//     if (urlLimit) return parseInt(urlLimit, 10);
//     if (savedLimit && !isNaN(savedLimit)) return parseInt(savedLimit, 10);
//     return 20; 
//   };

//   const initialType = () => {
//     const savedType = localStorage.getItem('type');
//     const urlParams = new URLSearchParams(window.location.search);
//     return urlParams.get('type') || savedType || '';
//   };

//   const initialSearch = () => {
//     const savedSearch = localStorage.getItem('search');
//     const urlParams = new URLSearchParams(window.location.search);
//     return urlParams.get('search') || savedSearch || '';
//   };

//   const [pokemons, setPokemons] = useState([]);
//   const [filteredPokemons, setFilteredPokemons] = useState([]);
//   const [type, setType] = useState(initialType);
//   const [search, setSearch] = useState(initialSearch);
//   const [limit, setLimit] = useState(initialLimit);
//   const [offset, setOffset] = useState(0); 
//   const [totalPokemons, setTotalPokemons] = useState(0);

//   const saveFiltersToLocalStorageAndURL = () => {
//     localStorage.setItem('type', type);
//     localStorage.setItem('search', search);
//     localStorage.setItem('limit', limit.toString());

//     const currentParams = new URLSearchParams(window.location.search);
//     currentParams.set('type', type);
//     currentParams.set('search', search);
//     currentParams.set('limit', limit.toString());
//     window.history.pushState({}, '', `${window.location.pathname}?${currentParams.toString()}`);
//   };

//   const filterPokemons = () => {
//     let filtered = pokemons;

//     if (search) {
//       filtered = filtered.filter(pokemon => pokemon.name.toLowerCase().includes(search.toLowerCase()));
//     }

//     if (type) {
//       filtered = filtered.filter(pokemon => pokemon.types.includes(type));
//     }

//     setFilteredPokemons(filtered);
//   };

//   useEffect(() => {
//     const fetchAndSetPokemons = async () => {
//       const pokemons = await fetchPokemon(limit, offset);
//       const filtered = pokemons.filter(pok => pok !== null);

//       const pokemonsWithDetails = await Promise.all(
//         filtered.map(async pokemon => {
//           const res = await fetch(pokemon.url);
//           const details = await res.json();
//           return {
//             id: details.id,
//             name: details.name,
//             image: details.sprites.front_default,
//             types: details.types.map(t => t.type.name),
//           };
//         })
//       );

//       setPokemons(pokemonsWithDetails);

//       const countRes = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1');
//       const countData = await countRes.json();
//       setTotalPokemons(countData.count);
//     };

//     fetchAndSetPokemons();
//   }, [limit, offset]);

//   useEffect(() => {
//     filterPokemons();
//   }, [search, type, pokemons]);

//   useEffect(() => {
//     saveFiltersToLocalStorageAndURL();
//   }, [search, type, limit]);

//   const handleSearchChange = (e) => {
//     setSearch(e.target.value);
//   };

//   const handleTypeChange = (e) => {
//     setType(e.target.value);
//   };

//   const handleLimitChange = (e) => {
//     const value = e.target.value;

//     // if (value === 'all') {
//     //   if (totalPokemons && !isNaN(totalPokemons)) {
//     //     setLimit(totalPokemons);
//     //   } else {
//     //     setLimit(100); 
//     //   }
//     // } else 
//     // {
//       const newLimit = parseInt(value, 10);
//       if (!isNaN(newLimit)) {
//         setLimit(newLimit);
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
//         <option value="1000000">All results</option>
//       </select>

//       <PokemonList pokemons={filteredPokemons} />
//     </div>
//   );
// }


// 'use client';
// import { useState, useEffect } from 'react';
// import { useStats } from '../StatsContext'; // Importujemy hook do kontekstu

// // Pobieranie Pokémonów z API
// async function fetchPokemon(limit, offset = 0) {
//   const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
//   const data = await res.json();
//   return data.results;
// }

// export default function PokemonPage() {
//   const { numberFormat, sortBy, viewType, updatePreferences } = useStats(); // Korzystamy z kontekstu

//   const [type, setType] = useState('');
//   const [search, setSearch] = useState('');
//   const [limit, setLimit] = useState(20);

//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   useEffect(() => {
//     if (isClient) {
//       const savedType = localStorage.getItem('type');
//       const savedSearch = localStorage.getItem('search');
//       const savedLimit = localStorage.getItem('limit');
//       setType(savedType || '');
//       setSearch(savedSearch || '');
//       setLimit(savedLimit ? parseInt(savedLimit, 10) : 20);
//     }
//   }, [isClient]);

//   const [pokemons, setPokemons] = useState([]);
//   const [filteredPokemons, setFilteredPokemons] = useState([]);
//   const [offset, setOffset] = useState(0);
//   const [totalPokemons, setTotalPokemons] = useState(0);

//   const saveFiltersToLocalStorageAndURL = () => {
//     localStorage.setItem('type', type);
//     localStorage.setItem('search', search);
//     localStorage.setItem('limit', limit.toString());

//     const currentParams = new URLSearchParams(window.location.search);
//     currentParams.set('type', type);
//     currentParams.set('search', search);
//     currentParams.set('limit', limit.toString());
//     window.history.pushState({}, '', `${window.location.pathname}?${currentParams.toString()}`);
//   };

//   const filterPokemons = () => {
//     let filtered = pokemons;

//     if (search) {
//       filtered = filtered.filter(pokemon => pokemon.name.toLowerCase().includes(search.toLowerCase()));
//     }

//     if (type) {
//       filtered = filtered.filter(pokemon => pokemon.types.includes(type));
//     }

//     setFilteredPokemons(filtered);
//   };

//   useEffect(() => {
//     const fetchAndSetPokemons = async () => {
//       const pokemons = await fetchPokemon(limit, offset);

//       const pokemonsWithDetails = await Promise.all(
//         pokemons.map(async pokemon => {
//           const res = await fetch(pokemon.url);
//           const details = await res.json();
//           return {
//             id: details.id,
//             name: details.name,
//             image: details.sprites.front_default,
//             types: details.types.map(t => t.type.name),
//             stats: details.stats.reduce((acc, stat) => {
//               acc[stat.stat.name] = stat.base_stat;
//               return acc;
//             }, {})
//           };
//         })
//       );

//       setPokemons(pokemonsWithDetails);

//       const countRes = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1');
//       const countData = await countRes.json();
//       setTotalPokemons(countData.count);
//     };

//     fetchAndSetPokemons();
//   }, [limit, offset]);

//   useEffect(() => {
//     filterPokemons();
//   }, [search, type, pokemons]);

//   useEffect(() => {
//     saveFiltersToLocalStorageAndURL();
//   }, [search, type, limit]);

//   const handleSearchChange = (e) => {
//     setSearch(e.target.value);
//   };

//   const handleTypeChange = (e) => {
//     setType(e.target.value);
//   };

//   const handleLimitChange = (e) => {
//     const value = e.target.value;
//     const newLimit = parseInt(value, 10);
//     if (!isNaN(newLimit)) {
//       setLimit(newLimit);
//     }
//   };

//   // Formatujemy liczby w zależności od ustawionego formatu
//   const formatNumber = (number) => {
//     switch (numberFormat) {
//       case 'percentage':
//         return `${(number * 100).toFixed(2)}%`;
//       case 'decimal':
//         return number.toFixed(2);
//       case 'rounded':
//         return Math.round(number);
//       default:
//         return number;
//     }
//   };

//   // Sortowanie Pokémonów według ustawień
//   const sortPokemons = (pokemons) => {
//     switch (sortBy) {
//       case 'name':
//         return pokemons.sort((a, b) => a.name.localeCompare(b.name));
//       case 'type':
//         return pokemons.sort((a, b) => a.types.join(', ').localeCompare(b.types.join(', ')));
//       case 'date':
//       default:
//         return pokemons; // domyślnie brak sortowania
//     }
//   };

//   const sortedPokemons = sortPokemons(filteredPokemons);

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
//         <option value="1000000">All results</option>
//       </select>
  
//       {/* Renderowanie listy Pokémonów */}
//       {viewType === 'table' ? (
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Type</th>
//               <th>Value</th>
//             </tr>
//           </thead>
//           <tbody>
//   {sortedPokemons.map((pokemon) => {
//     return (
//       <tr key={pokemon.id}>
//         <td>{pokemon.name}</td>
//         <td>{pokemon.types.join(', ')}</td>
//         <td>{formatNumber(pokemon.stats?.attack || 0)}</td>
//       </tr>
//     );
//   })}
// </tbody>

//         </table>
//       ) : (
//         <div className="cards">
//           {sortedPokemons.map(pokemon => (
//             <div key={pokemon.id} className="card">
//               <h3>{pokemon.name}</h3>
//               <p>Types: {pokemon.types.join(', ')}</p>
//               <p>Value: {formatNumber(pokemon.stats?.attack || 0)}</p> {/* Przykład użycia statystyki attack */}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
  
// }




// 'use client';
// import { useState, useEffect, useContext } from 'react';
// import { StatsContext } from '../StatsContext';  // Zaimportuj StatsContext
// import PokemonList from '../components/PokemonList';  // Zaimportuj PokemonList

// async function fetchPokemon(limit, offset = 0) {
//   const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
//   const data = await res.json();
//   return data.results;
// }

// export default function PokemonPage() {
//   const { numberFormat, sortBy, viewType } = useContext(StatsContext);  // Używamy preferencji z contextu
//   const initialLimit = () => {
//     const savedLimit = localStorage.getItem('limit');
//     const urlParams = new URLSearchParams(window.location.search);
//     const urlLimit = urlParams.get('limit');
//     if (urlLimit) return parseInt(urlLimit, 10);
//     if (savedLimit && !isNaN(savedLimit)) return parseInt(savedLimit, 10);
//     return 20;
//   };

//   const initialType = () => {
//     const savedType = localStorage.getItem('type');
//     const urlParams = new URLSearchParams(window.location.search);
//     return urlParams.get('type') || savedType || '';
//   };

//   const initialSearch = () => {
//     const savedSearch = localStorage.getItem('search');
//     const urlParams = new URLSearchParams(window.location.search);
//     return urlParams.get('search') || savedSearch || '';
//   };

//   const [pokemons, setPokemons] = useState([]);
//   const [filteredPokemons, setFilteredPokemons] = useState([]);
//   const [type, setType] = useState(initialType);
//   const [search, setSearch] = useState(initialSearch);
//   const [limit, setLimit] = useState(initialLimit);
//   const [offset, setOffset] = useState(0);
//   const [totalPokemons, setTotalPokemons] = useState(0);

//   const saveFiltersToLocalStorageAndURL = () => {
//     localStorage.setItem('type', type);
//     localStorage.setItem('search', search);
//     localStorage.setItem('limit', limit.toString());

//     const currentParams = new URLSearchParams(window.location.search);
//     currentParams.set('type', type);
//     currentParams.set('search', search);
//     currentParams.set('limit', limit.toString());
//     window.history.pushState({}, '', `${window.location.pathname}?${currentParams.toString()}`);
//   };

//   const filterPokemons = (pokemons) => {
//     let filtered = pokemons;

//     if (search) {
//       filtered = filtered.filter(pokemon => pokemon.name.toLowerCase().includes(search.toLowerCase()));
//     }

//     if (type) {
//       filtered = filtered.filter(pokemon => pokemon.types.includes(type));
//     }

//     return filtered;
//   };

//   const formatNumber = (num) => {
//     if (numberFormat === 'percentage') {
//       return `${(num * 100).toFixed(2)}%`;
//     }
//     if (numberFormat === 'rounded') {
//       return Math.round(num);
//     }
//     return num.toFixed(2);
//   };

//   const sortPokemons = (pokemons) => {
//     if (sortBy === 'name') {
//       return [...pokemons].sort((a, b) => a.name.localeCompare(b.name));
//     } else if (sortBy === 'value') {
//       return [...pokemons].sort((a, b) => a.stats.attack - b.stats.attack);
//     }
//     return pokemons;
//   };
  

//   useEffect(() => {
//     const fetchAndSetPokemons = async () => {
//       const pokemons = await fetchPokemon(limit, offset);
//       const filtered = pokemons.filter(pok => pok !== null);

//       const pokemonsWithDetails = await Promise.all(
//         filtered.map(async pokemon => {
//           const res = await fetch(pokemon.url);
//           const details = await res.json();
//           return {
//             id: details.id,
//             name: details.name,
//             image: details.sprites.front_default,
//             types: details.types.map(t => t.type.name),
//             stats: details.stats,  // Pobieramy statystyki
//           };
//         })
//       );

//       setPokemons(pokemonsWithDetails); // Zapisanie do stanu bez sortowania

//       const countRes = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1');
//       const countData = await countRes.json();
//       setTotalPokemons(countData.count);
//     };

//     fetchAndSetPokemons();
//   }, [limit, offset]);

//   useEffect(() => {
//     // Sortowanie i filtrowanie po załadowaniu danych
//     let updatedPokemons = filterPokemons(pokemons);
//     updatedPokemons = sortPokemons(updatedPokemons);
//     setFilteredPokemons(updatedPokemons);
//   }, [pokemons, search, type, sortBy]); // Dodajemy sortBy jako zależność

//   useEffect(() => {
//     saveFiltersToLocalStorageAndURL();
//   }, [search, type, limit]);

//   const handleSearchChange = (e) => {
//     setSearch(e.target.value);
//   };

//   const handleTypeChange = (e) => {
//     setType(e.target.value);
//   };

//   const handleLimitChange = (e) => {
//     const newLimit = parseInt(e.target.value, 10);
//     if (!isNaN(newLimit)) {
//       setLimit(newLimit);
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
//         <option value="1000000">All results</option>
//       </select>

//       {/* Przekazanie przefiltrowanych i posortowanych Pokémonów do komponentu PokemonList */}
//       <PokemonList pokemons={filteredPokemons} formatNumber={formatNumber} viewType={viewType} sortBy={sortBy}/>
//     </div>
//   );
// }



// 'use client';
// import React, { useReducer, useEffect, useContext } from 'react';
// import { StatsContext } from '../StatsContext'; // Zaimportuj StatsContext
// import PokemonList from '../components/PokemonList'; // Zaimportuj PokemonList

// // Reducer do zarządzania danymi
// const statsReducer = (state, action) => {
//   switch (action.type) {
//     case 'LOAD_DATA':
//       return { ...state, data: action.payload };
//     case 'FILTER_DATA':
//       return { ...state, filteredData: action.payload };
//     case 'SORT_DATA':
//       return { ...state, filteredData: action.payload };
//     case 'CALCULATE_STATS':
//       return { ...state, stats: action.payload };
//     default:
//       return state;
//   }
// };

// // Custom hook do obsługi localStorage
// const useLocalStorage = (key, initialValue) => {
//   const [value, setValue] = React.useState(() => {
//     const storedValue = localStorage.getItem(key);
//     return storedValue ? JSON.parse(storedValue) : initialValue;
//   });

//   useEffect(() => {
//     localStorage.setItem(key, JSON.stringify(value));
//   }, [key, value]);

//   return [value, setValue];
// };

// // Funkcja do pobierania danych o Pokémonach
// async function fetchPokemon(limit, offset = 0) {
//   const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
//   const data = await res.json();
//   return data.results;
// }

// // Komponent główny
// export default function PokemonPage() {
//   const { numberFormat, sortBy, viewType } = useContext(StatsContext); // Preferencje z contextu

//   const [type, setType] = useLocalStorage('type', '');
//   const [search, setSearch] = useLocalStorage('search', '');
//   const [limit, setLimit] = useLocalStorage('limit', 20);
//   const [offset, setOffset] = React.useState(0);

//   const [state, dispatch] = useReducer(statsReducer, {
//     data: [],
//     filteredData: [],
//     stats: {},
//   });

//   const saveFiltersToURL = () => {
//     const params = new URLSearchParams();
//     params.set('type', type);
//     params.set('search', search);
//     params.set('limit', limit.toString());
//     window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
//   };

//   const filterPokemons = (pokemons) => {
//     let filtered = pokemons;
//     if (search) {
//       filtered = filtered.filter((pokemon) =>
//         pokemon.name.toLowerCase().includes(search.toLowerCase())
//       );
//     }
//     if (type) {
//       filtered = filtered.filter((pokemon) => pokemon.types.includes(type));
//     }
//     return filtered;
//   };

//   const sortPokemons = (pokemons) => {
//     if (sortBy === 'name') {
//       return [...pokemons].sort((a, b) => a.name.localeCompare(b.name));
//     } else if (sortBy === 'value') {
//       return [...pokemons].sort((a, b) => a.stats[0].base_stat - b.stats[0].base_stat);
//     }
//     return pokemons;
//   };

//   // const calculateStats = (pokemons) => {
//   //   const favoriteCount = pokemons.length;
//   //   const typeCounts = pokemons.flatMap((p) => p.types).reduce((acc, type) => {
//   //     acc[type] = (acc[type] || 0) + 1;
//   //     return acc;
//   //   }, {});
//   //   const commonType = Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Unknown';
//   //   const averageRating =
//   //     pokemons.reduce((sum, p) => sum + p.stats[0].base_stat, 0) / pokemons.length || 0;

//   //   dispatch({
//   //     type: 'CALCULATE_STATS',
//   //     payload: { favoriteCount, commonType, averageRating },
//   //   });
//   // };

//   const calculateStats = (pokemons) => {
//     const favoriteCount = (JSON.parse(localStorage.getItem('favorites') || '[]')).length;
// console.log(favoriteCount.length);  // Zwróci liczbę elementów w tablicy

  
//     const typeCounts = pokemons.flatMap((p) => p.types).reduce((acc, type) => {
//       acc[type] = (acc[type] || 0) + 1;
//       return acc;
//     }, {});
  
//     const commonType = Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Unknown';
  
//     const averageRatingRaw =
//       pokemons.reduce((sum, p) => sum + (p.stats[0]?.base_stat || 0), 0) / (pokemons.length || 1);
  
//     const averageRating = Math.round(averageRatingRaw * 100) / 100 || 0; // Zaokrąglenie do dwóch miejsc
  
//     dispatch({
//       type: 'CALCULATE_STATS',
//       payload: { favoriteCount, commonType, averageRating },
//     });
//   };
  
  

//   useEffect(() => {
//     const fetchAndSetPokemons = async () => {
//       const pokemons = await fetchPokemon(limit, offset);
//       const detailedPokemons = await Promise.all(
//         pokemons.map(async (pokemon) => {
//           const res = await fetch(pokemon.url);
//           const details = await res.json();
//           return {
//             id: details.id,
//             name: details.name,
//             image: details.sprites.front_default,
//             types: details.types.map((t) => t.type.name),
//             stats: details.stats,
//           };
//         })
//       );

//       dispatch({ type: 'LOAD_DATA', payload: detailedPokemons });
//     };

//     fetchAndSetPokemons();
//   }, [limit, offset]);

//   useEffect(() => {
//     const filtered = filterPokemons(state.data);
//     const sorted = sortPokemons(filtered);
//     dispatch({ type: 'FILTER_DATA', payload: sorted });
//   }, [state.data, search, type, sortBy]);

//   useEffect(() => {
//     calculateStats(state.filteredData);
//   }, [state.filteredData]);

//   useEffect(() => {
//     saveFiltersToURL();
//   }, [type, search, limit]);

//   const handleSearchChange = (e) => setSearch(e.target.value);
//   const handleTypeChange = (e) => setType(e.target.value);
//   const handleLimitChange = (e) => setLimit(parseInt(e.target.value, 10));

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
//       </select>

//       <div>
//         <h2>Statystyki</h2>
//         <div>Liczba ulubionych: {state.stats.favoriteCount || 0}</div>
//         <div>Najczęstszy typ: {state.stats.commonType || 'Unknown'}</div>
//         <div>
//   Średnia ocena: {typeof state.stats.averageRating === 'number' ? state.stats.averageRating.toFixed(2) : '0.00'}
// </div>

//       </div>

//       <PokemonList
//   pokemons={state.filteredData}
//   formatNumber={(num) => {
//     if (num == null) return '0';  
//     return numberFormat === 'percentage'
//       ? `${(num * 100).toFixed(2)}%`
//       : numberFormat === 'rounded'
//       ? Math.round(num)
//       : num.toFixed(2);
//   }}
//   viewType={viewType}
// />

//     </div>
//   );
// }

//dziala?
// 'use client';
// import React, { useReducer, useEffect, useContext } from 'react';
// import { StatsContext } from '../StatsContext'; // Zaimportuj StatsContext
// import PokemonList from '../components/PokemonList'; // Zaimportuj PokemonList

// const statsReducer = (state, action) => {
//   switch (action.type) {
//     case 'LOAD_DATA':
//       return { ...state, data: action.payload };
//     case 'FILTER_DATA':
//       return { ...state, filteredData: action.payload };
//     case 'SORT_DATA':
//       return { ...state, filteredData: action.payload };
//     case 'CALCULATE_STATS':
//       return { ...state, stats: action.payload };
//     default:
//       return state;
//   }
// };

// const useLocalStorage = (key, initialValue) => {
//   const [value, setValue] = React.useState(() => {
//     const storedValue = localStorage.getItem(key);
//     return storedValue ? JSON.parse(storedValue) : initialValue;
//   });

//   useEffect(() => {
//     localStorage.setItem(key, JSON.stringify(value));
//   }, [key, value]);

//   return [value, setValue];
// };

// async function fetchPokemon(limit, offset = 0) {
//   const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
//   const data = await res.json();
//   return data.results;
// }

// export default function PokemonPage() {
//   const { numberFormat, sortBy, viewType } = useContext(StatsContext);

//   const [type, setType] = useLocalStorage('type', '');
//   const [search, setSearch] = useLocalStorage('search', '');
//   const [limit, setLimit] = useLocalStorage('limit', 20);
//   const [offset, setOffset] = React.useState(0);

//   const [state, dispatch] = useReducer(statsReducer, {
//     data: [],
//     filteredData: [],
//     stats: {},
//   });

//   const saveFiltersToURL = () => {
//     const params = new URLSearchParams();
//     params.set('type', type);
//     params.set('search', search);
//     params.set('limit', limit.toString());
//     window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
//   };

//   const filterPokemons = (pokemons) => {
//     let filtered = pokemons;
//     if (search) {
//       filtered = filtered.filter((pokemon) =>
//         pokemon.name.toLowerCase().includes(search.toLowerCase())
//       );
//     }
//     if (type) {
//       filtered = filtered.filter((pokemon) => pokemon.types.includes(type));
//     }
//     return filtered;
//   };

//   const sortPokemons = (pokemons) => {
//     if (sortBy === 'name') {
//       return [...pokemons].sort((a, b) => a.name.localeCompare(b.name));
//     } else if (sortBy === 'value') {
//       return [...pokemons].sort((a, b) => a.stats[0].base_stat - b.stats[0].base_stat);
//     }
//     return pokemons;
//   };

//   const calculateStats = (pokemons) => {
//     const favoriteCount = (JSON.parse(localStorage.getItem('favorites') || '[]')).length;

//     const typeCounts = pokemons.flatMap((p) => p.types).reduce((acc, type) => {
//       acc[type] = (acc[type] || 0) + 1;
//       return acc;
//     }, {});

//     const commonType = Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Unknown';

//     const averageRatingRaw =
//       pokemons.reduce((sum, p) => sum + (p.stats[0]?.base_stat || 0), 0) / (pokemons.length || 1);

//     const averageRating = Math.round(averageRatingRaw * 100) / 100 || 0;

//     dispatch({
//       type: 'CALCULATE_STATS',
//       payload: { favoriteCount, commonType, averageRating },
//     });
//   };

//   useEffect(() => {
//     const fetchAndSetPokemons = async () => {
//       const pokemons = await fetchPokemon(limit, offset);
//       const detailedPokemons = await Promise.all(
//         pokemons.map(async (pokemon) => {
//           const res = await fetch(pokemon.url);
//           const details = await res.json();
//           return {
//             id: details.id,
//             name: details.name,
//             image: details.sprites.front_default,
//             types: details.types.map((t) => t.type.name),
//             stats: details.stats,
//           };
//         })
//       );

//       dispatch({ type: 'LOAD_DATA', payload: detailedPokemons });
//     };

//     fetchAndSetPokemons();
//   }, [limit, offset]);

//   useEffect(() => {
//     const filtered = filterPokemons(state.data);
//     const sorted = sortPokemons(filtered);
//     dispatch({ type: 'FILTER_DATA', payload: sorted });
//   }, [state.data, search, type, sortBy]);

//   useEffect(() => {
//     calculateStats(state.filteredData);
//   }, [state.filteredData]);

//   useEffect(() => {
//     saveFiltersToURL();
//   }, [type, search, limit]);

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const urlType = urlParams.get('type') || '';
//     const urlSearch = urlParams.get('search') || '';
//     const urlLimit = parseInt(urlParams.get('limit')) || 20;

//     setType(urlType);
//     setSearch(urlSearch);
//     setLimit(urlLimit);
//   }, []); // Load filters on mount

//   const handleSearchChange = (e) => setSearch(e.target.value);
//   const handleTypeChange = (e) => setType(e.target.value);
//   const handleLimitChange = (e) => setLimit(parseInt(e.target.value, 10));

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
//       </select>

//       <div>
//         <h2>Historia Aktywności</h2>
//         <div>Typ: {type || 'Brak'}</div>
//         <div>Wyszukiwanie: {search || 'Brak'}</div>
//         <div>Limit: {limit || 20}</div>
//       </div>

//       <div>
//         <h2>Statystyki</h2>
//         <div>Liczba ulubionych: {state.stats.favoriteCount || 0}</div>
//         <div>Najczęstszy typ: {state.stats.commonType || 'Unknown'}</div>
//         <div>
//           Średnia ocena: {typeof state.stats.averageRating === 'number' ? state.stats.averageRating.toFixed(2) : '0.00'}
//         </div>
//       </div>

//       <PokemonList
//         pokemons={state.filteredData}
//         formatNumber={(num) => {
//           if (num == null) return '0';
//           return numberFormat === 'percentage'
//             ? `${(num * 100).toFixed(2)}%`
//             : numberFormat === 'rounded'
//             ? Math.round(num)
//             : num.toFixed(2);
//         }}
//         viewType={viewType}
//       />
//     </div>
//   );
// }



// 'use client';
// import React, { useReducer, useEffect, useContext } from 'react';
// import { StatsContext } from '../StatsContext'; // Zaimportuj StatsContext
// import PokemonList from '../components/PokemonList'; // Zaimportuj PokemonList
// import PreferencesForm from '../PreferencesForm';
// const statsReducer = (state, action) => {
//   switch (action.type) {
//     case 'LOAD_DATA':
//       return { ...state, data: action.payload };
//     case 'FILTER_DATA':
//       return { ...state, filteredData: action.payload };
//     case 'SORT_DATA':
//       return { ...state, filteredData: action.payload };
//     case 'CALCULATE_STATS':
//       return { ...state, stats: action.payload };
//     case 'ADD_HISTORY':
//       return { ...state, history: action.payload }; // Zaktualizowanie całej historii
//     default:
//       return state;
//   }
// };

// const useLocalStorage = (key, initialValue) => {
//   const [value, setValue] = React.useState(() => {
//     const storedValue = localStorage.getItem(key);
//     return storedValue ? JSON.parse(storedValue) : initialValue;
//   });

//   useEffect(() => {
//     localStorage.setItem(key, JSON.stringify(value));
//   }, [key, value]);

//   return [value, setValue];
// };

// async function fetchPokemon(limit, offset = 0) {
//   const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
//   const data = await res.json();
//   return data.results;
// }

// export default function PokemonPage() {
//   const { numberFormat, sortBy, viewType } = useContext(StatsContext);

//   const [type, setType] = useLocalStorage('type', '');
//   const [search, setSearch] = useLocalStorage('search', '');
//   const [limit, setLimit] = useLocalStorage('limit', 20);
//   const [offset, setOffset] = React.useState(0);

//   const [state, dispatch] = useReducer(statsReducer, {
//     data: [],
//     filteredData: [],
//     stats: {},
//     history: [], // Historia będzie przechowywana w stanie
//   });

//   const saveFiltersToURL = () => {
//     const params = new URLSearchParams();
//     params.set('type', type);
//     params.set('search', search);
//     params.set('limit', limit.toString());
//     window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
//   };

//   const filterPokemons = (pokemons) => {
//     let filtered = pokemons;
//     if (search) {
//       filtered = filtered.filter((pokemon) =>
//         pokemon.name.toLowerCase().includes(search.toLowerCase())
//       );
//     }
//     if (type) {
//       filtered = filtered.filter((pokemon) => pokemon.types.includes(type));
//     }
//     return filtered;
//   };

//   const sortPokemons = (pokemons) => {
//     if (sortBy === 'name') {
//       return [...pokemons].sort((a, b) => a.name.localeCompare(b.name));
//     } else if (sortBy === 'value') {
//       return [...pokemons].sort((a, b) => a.stats[0].base_stat - b.stats[0].base_stat);
//     }
//     return pokemons;
//   };

//   const calculateStats = (pokemons) => {
//     const favoriteCount = (JSON.parse(localStorage.getItem('favorites') || '[]')).length;

//     const typeCounts = pokemons.flatMap((p) => p.types).reduce((acc, type) => {
//       acc[type] = (acc[type] || 0) + 1;
//       return acc;
//     }, {});

//     const commonType = Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Unknown';

//     const averageRatingRaw =
//       pokemons.reduce((sum, p) => sum + (p.stats[0]?.base_stat || 0), 0) / (pokemons.length || 1);

//     const averageRating = Math.round(averageRatingRaw * 100) / 100 || 0;

//     // Top 3 Pokémony (sortowanie po wartościach statystyk)
//     const top3Pokemons = [...pokemons]
//       .sort((a, b) => b.stats[0]?.base_stat - a.stats[0]?.base_stat)
//       .slice(0, 3);

//     // Rozkład typów
//     const typeDistribution = pokemons.flatMap((p) => p.types).reduce((acc, type) => {
//       acc[type] = (acc[type] || 0) + 1;
//       return acc;
//     }, {});

//     dispatch({
//       type: 'CALCULATE_STATS',
//       payload: { favoriteCount, commonType, averageRating, top3Pokemons, typeDistribution },
//     });
//   };

//   useEffect(() => {
//     // Załaduj dane z localStorage lub ustal domyślną historię
//     const storedHistory = JSON.parse(localStorage.getItem('history')) || [];
//     dispatch({
//       type: 'ADD_HISTORY',
//       payload: storedHistory, // Załaduj historię
//     });
//   }, []);

//   useEffect(() => {
//     const fetchAndSetPokemons = async () => {
//       const pokemons = await fetchPokemon(limit, offset);
//       const detailedPokemons = await Promise.all(
//         pokemons.map(async (pokemon) => {
//           const res = await fetch(pokemon.url);
//           const details = await res.json();
//           return {
//             id: details.id,
//             name: details.name,
//             image: details.sprites.front_default,
//             types: details.types.map((t) => t.type.name),
//             stats: details.stats,
//           };
//         })
//       );

//       dispatch({ type: 'LOAD_DATA', payload: detailedPokemons });
//     };

//     fetchAndSetPokemons();
//   }, [limit, offset]);

//   useEffect(() => {
//     const filtered = filterPokemons(state.data);
//     const sorted = sortPokemons(filtered);
//     dispatch({ type: 'FILTER_DATA', payload: sorted });
//   }, [state.data, search, type, sortBy]);

//   useEffect(() => {
//     calculateStats(state.filteredData);
//   }, [state.filteredData]);

//   useEffect(() => {
//     saveFiltersToURL();
//   }, [type, search, limit]);

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const urlType = urlParams.get('type') || '';
//     const urlSearch = urlParams.get('search') || '';
//     const urlLimit = parseInt(urlParams.get('limit')) || 20;

//     setType(urlType);
//     setSearch(urlSearch);
//     setLimit(urlLimit);
//   }, []); // Load filters on mount

//   const handleSearchChange = (e) => {
//     setSearch(e.target.value);
//     const newHistory = [...state.history, { action: 'search', value: e.target.value }];
//     dispatch({
//       type: 'ADD_HISTORY',
//       payload: newHistory
//     });
//     localStorage.setItem('history', JSON.stringify(newHistory)); // Zapisz historię w localStorage
//   };

//   const handleTypeChange = (e) => {
//     setType(e.target.value);
//     const newHistory = [...state.history, { action: 'type', value: e.target.value }];
//     dispatch({
//       type: 'ADD_HISTORY',
//       payload: newHistory
//     });
//     localStorage.setItem('history', JSON.stringify(newHistory)); // Zapisz historię w localStorage
//   };

//   const handleLimitChange = (e) => {
//     setLimit(parseInt(e.target.value, 10));
//     const newHistory = [...state.history, { action: 'limit', value: e.target.value }];
//     dispatch({
//       type: 'ADD_HISTORY',
//       payload: newHistory
//     });
//     localStorage.setItem('history', JSON.stringify(newHistory)); // Zapisz historię w localStorage
//   };

//   return (
//     <div>
//       <PreferencesForm/>
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
//       </select>

//       <div>
//         <h2>Historia Aktywności</h2>
//         <ul>
//           {state.history.map((entry, index) => (
//             <li key={index}>{entry.action}: {entry.value}</li>
//           ))}
//         </ul>
//       </div>

//       <div>
//         <h2>Statystyki</h2>
//         <div>Liczba ulubionych: {state.stats.favoriteCount || 0}</div>
//         <div>Najczęstszy typ: {state.stats.commonType || 'Unknown'}</div>
//         <div>
//           Średnia ocena: {typeof state.stats.averageRating === 'number' ? state.stats.averageRating.toFixed(2) : '0.00'}
//         </div>
//       </div>

//       <div>
//         <h2>Top 3 Pokemony</h2>
//         <ul>
//           {state.stats.top3Pokemons?.map((pokemon) => (
//             <li key={pokemon.id}>{pokemon.name}</li>
//           ))}
//         </ul>
//       </div>

//       <div>
//         <h2>Rozkład Typów</h2>
//         <ul>
//           {Object.entries(state.stats.typeDistribution || {}).map(([type, count]) => (
//             <li key={type}>{type}: {count}</li>
//           ))}
//         </ul>
//       </div>

//       <PokemonList
//         pokemons={state.filteredData}
//         formatNumber={(num) => {
//           if (num == null) return '0';
//           return numberFormat === 'percentage'
//             ? `${(num * 100).toFixed(2)}%`
//             : numberFormat === 'rounded'
//             ? Math.round(num)
//             : num.toFixed(2);
//         }}
//         viewType={viewType}
//       />

//       <div>
//         <button onClick={() => handlePageChange('prev')} disabled={offset === 0}>Previous</button>
//         <button onClick={() => handlePageChange('next')}>Next</button>
//       </div>
//     </div>
//   );
// }
 


//dziala ale sortowanie nie
// 'use client';
// import React, { useReducer, useEffect, useContext } from 'react';
// import { StatsContext } from '../StatsContext'; // Zaimportuj StatsContext
// import PokemonList from '../components/PokemonList'; // Zaimportuj PokemonList
// import PreferencesForm from '../PreferencesForm';

// const statsReducer = (state, action) => {
//   switch (action.type) {
//     case 'LOAD_DATA':
//       return { ...state, data: action.payload };
//     case 'FILTER_DATA':
//       return { ...state, filteredData: action.payload };
//     case 'SORT_DATA':
//       return { ...state, filteredData: action.payload };
//     case 'CALCULATE_STATS':
//       return { ...state, stats: action.payload };
//     case 'ADD_HISTORY':
//       return { ...state, history: action.payload };
//     default:
//       return state;
//   }
// };

// const useLocalStorage = (key, initialValue) => {
//   const [value, setValue] = React.useState(() => {
//     const storedValue = localStorage.getItem(key);
//     return storedValue ? JSON.parse(storedValue) : initialValue;
//   });

//   useEffect(() => {
//     localStorage.setItem(key, JSON.stringify(value));
//   }, [key, value]);

//   return [value, setValue];
// };

// async function fetchPokemon(limit, offset = 0) {
//   const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
//   if (!res.ok) throw new Error('Failed to fetch Pokémon data');
//   const data = await res.json();
//   return data.results;
// }

// export default function PokemonPage() {
//   const { numberFormat, sortBy, viewType } = useContext(StatsContext);

//   const [type, setType] = useLocalStorage('type', '');
//   const [search, setSearch] = useLocalStorage('search', '');
//   const [limit, setLimit] = useLocalStorage('limit', 20);
//   const [offset, setOffset] = React.useState(0);
//   const [loading, setLoading] = React.useState(false);

//   const [state, dispatch] = useReducer(statsReducer, {
//     data: [],
//     filteredData: [],
//     stats: {},
//     history: [],
//   });

//   const saveFiltersToURL = () => {
//     const params = new URLSearchParams();
//     params.set('type', type);
//     params.set('search', search);
//     params.set('limit', limit.toString());
//     window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
//   };

//   const filterPokemons = (pokemons) => {
//     let filtered = pokemons;
//     if (search) {
//       filtered = filtered.filter((pokemon) =>
//         pokemon.name.toLowerCase().includes(search.toLowerCase())
//       );
//     }
//     if (type) {
//       filtered = filtered.filter((pokemon) => pokemon.types.includes(type));
//     }
//     return filtered;
//   };

//   const sortPokemons = (pokemons) => {
//     if (sortBy === 'name') {
//       return [...pokemons].sort((a, b) => a.name.localeCompare(b.name));
//     } else if (sortBy === 'value') {
//       return [...pokemons].sort((a, b) => a.stats[0].base_stat - b.stats[0].base_stat);
//     }
//     return pokemons;
//   };

//   const calculateStats = (pokemons) => {
//     const favoriteCount = (JSON.parse(localStorage.getItem('favorites') || '[]')).length;

//     const typeCounts = pokemons.flatMap((p) => p.types).reduce((acc, type) => {
//       acc[type] = (acc[type] || 0) + 1;
//       return acc;
//     }, {});

//     const commonType = Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Unknown';

//     const averageRating =
//       Math.round(
//         (pokemons.reduce((sum, p) => sum + (p.stats[0]?.base_stat || 0), 0) / (pokemons.length || 1)) *
//           100
//       ) / 100 || 0;

//     const top3Pokemons = [...pokemons]
//       .sort((a, b) => b.stats[0]?.base_stat - a.stats[0]?.base_stat)
//       .slice(0, 3);

//     const typeDistribution = pokemons.flatMap((p) => p.types).reduce((acc, type) => {
//       acc[type] = (acc[type] || 0) + 1;
//       return acc;
//     }, {});

//     dispatch({
//       type: 'CALCULATE_STATS',
//       payload: { favoriteCount, commonType, averageRating, top3Pokemons, typeDistribution },
//     });
//   };

//   const handlePageChange = (direction) => {
//     const newOffset = direction === 'next' ? offset + limit : Math.max(offset - limit, 0);
//     setOffset(newOffset);
//     const newHistory = [...state.history, { action: 'pageChange', value: `offset: ${newOffset}` }];
//     dispatch({ type: 'ADD_HISTORY', payload: newHistory });
//     localStorage.setItem('history', JSON.stringify(newHistory));
//   };

//   const resetFilters = () => {
//     setSearch('');
//     setType('');
//     setLimit(20);
//     setOffset(0);
//     const newHistory = [...state.history, { action: 'resetFilters', value: 'All filters reset' }];
//     dispatch({ type: 'ADD_HISTORY', payload: newHistory });
//     localStorage.setItem('history', JSON.stringify(newHistory));
//   };

//   useEffect(() => {
//     const fetchAndSetPokemons = async () => {
//       setLoading(true);
//       try {
//         const pokemons = await fetchPokemon(limit, offset);
//         const detailedPokemons = await Promise.all(
//           pokemons.map(async (pokemon) => {
//             try {
//               const res = await fetch(pokemon.url);
//               const details = await res.json();
//               return {
//                 id: details.id,
//                 name: details.name,
//                 image: details.sprites.front_default,
//                 types: details.types.map((t) => t.type.name),
//                 stats: details.stats,
//               };
//             } catch {
//               console.error(`Failed to fetch details for ${pokemon.name}`);
//               return null;
//             }
//           })
//         );
//         const validPokemons = detailedPokemons.filter(Boolean);
//         dispatch({ type: 'LOAD_DATA', payload: validPokemons });
//       } catch (error) {
//         console.error('Failed to fetch Pokémon list:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAndSetPokemons();
//   }, [limit, offset]);

//   useEffect(() => {
//     const filtered = filterPokemons(state.data);
//     const sorted = sortPokemons(filtered);
//     dispatch({ type: 'FILTER_DATA', payload: sorted });
//   }, [state.data, search, type, sortBy]);

//   useEffect(() => {
//     calculateStats(state.filteredData);
//   }, [state.filteredData]);

//   useEffect(() => {
//     saveFiltersToURL();
//   }, [type, search, limit]);

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     setType(urlParams.get('type') || '');
//     setSearch(urlParams.get('search') || '');
//     setLimit(parseInt(urlParams.get('limit')) || 20);
//   }, []);

//   return (
//     <div>
//       <PreferencesForm />
//       <h1>Pokémon List</h1>
//       {loading && <div>Loading...</div>}
//       <button onClick={resetFilters}>Reset Filters</button>
//       <input
//         type="text"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         placeholder="Search Pokémon"
//       />
//       <select value={type} onChange={(e) => setType(e.target.value)}>
//         <option value="">All Types</option>
//         <option value="fire">Fire</option>
//         <option value="water">Water</option>
//         <option value="grass">Grass</option>
//         <option value="normal">Normal</option>
//       </select>
//       <select value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
//         <option value="20">20 results</option>
//         <option value="50">50 results</option>
//         <option value="100">100 results</option>
//         <option value="1000000">All</option>
//       </select>
//       <div>
//         <h2>Activity History</h2>
//         <ul>
//           {state.history.map((entry, index) => (
//             <li key={index}>
//               {entry.action}: {entry.value}
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div>
//         <h2>Statistics</h2>
//         <div>Favorites Count: {state.stats.favoriteCount || 0}</div>
//         <div>Most Common Type: {state.stats.commonType || 'Unknown'}</div>
//         <div>Average Rating: {state.stats.averageRating?.toFixed(2) || '0.00'}</div>
//       </div>
//       <div>
//         <h2>Top 3 Pokémon</h2>
//         <ul>
//           {state.stats.top3Pokemons?.map((pokemon) => (
//             <li key={pokemon.id}>{pokemon.name}</li>
//           ))}
//         </ul>
//       </div>
//       <div>
//         <h2>Type Distribution</h2>
//         <ul>
//           {Object.entries(state.stats.typeDistribution || {}).map(([type, count]) => (
//             <li key={type}>
//               {type}: {count}
//             </li>
//           ))}
//         </ul>
//       </div>
//       <PokemonList pokemons={state.filteredData} />
//       <div>
//         <button onClick={() => handlePageChange('prev')} disabled={offset === 0}>
//           Previous
//         </button>
//         <button onClick={() => handlePageChange('next')}>Next</button>
//       </div>
//     </div>
//   );
// }












'use client'
import React, { useReducer, useEffect, useContext } from 'react';
import { StatsContext } from '../StatsContext'; // Zaimportuj StatsContext
import PokemonList from '../components/PokemonList'; // Zaimportuj PokemonList
import PreferencesForm from '../PreferencesForm';

const statsReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_DATA':
      return { ...state, data: action.payload };
    case 'FILTER_DATA':
      return { ...state, filteredData: action.payload };
    case 'SORT_DATA':
      const { sortBy } = action.payload; // sortBy jest teraz częścią action.payload
      let sortedData = [...state.filteredData];

      if (sortBy === 'name') {
        sortedData.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortBy === 'value') {
        sortedData.sort((a, b) => a.stats[0].base_stat - b.stats[0].base_stat);
      }
      
      return { ...state, filteredData: sortedData };
    case 'CALCULATE_STATS':
      return { ...state, stats: action.payload };
    case 'ADD_HISTORY':
      return { ...state, history: action.payload };
    default:
      return state;
  }
};

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = React.useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

async function fetchPokemon(limit, offset = 0) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  if (!res.ok) throw new Error('Failed to fetch Pokémon data');
  const data = await res.json();
  return data.results;
}

export default function PokemonPage() {
  const { numberFormat, sortBy, viewType } = useContext(StatsContext); // Pobieramy 'sortBy' z kontekstu

  const [type, setType] = useLocalStorage('type', '');
  const [search, setSearch] = useLocalStorage('search', '');
  const [limit, setLimit] = useLocalStorage('limit', 20);
  const [offset, setOffset] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const [state, dispatch] = useReducer(statsReducer, {
    data: [],
    filteredData: [],
    stats: {},
    history: [],
  });

  const saveFiltersToURL = () => {
    const params = new URLSearchParams();
    params.set('type', type);
    params.set('search', search);
    params.set('limit', limit.toString());
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
  };

  const filterPokemons = (pokemons) => {
    let filtered = pokemons;
    if (search) {
      filtered = filtered.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (type) {
      filtered = filtered.filter((pokemon) => pokemon.types.includes(type));
    }
    return filtered;
  };

  // Zmieniamy useEffect aby wywołać 'SORT_DATA' z odpowiednim sortowaniem
  useEffect(() => {
    const filtered = filterPokemons(state.data); // Filtrowanie
    dispatch({ type: 'FILTER_DATA', payload: filtered });

    // Po przefiltrowaniu, sortujemy dane
    dispatch({ type: 'SORT_DATA', payload: { sortBy } }); // Wysyłamy 'sortBy' z kontekstu
  }, [state.data, search, type, sortBy]); // Dodajemy 'sortBy' jako zależność

  const calculateStats = (pokemons) => {
    const favoriteCount = (JSON.parse(localStorage.getItem('favorites') || '[]')).length;

    const typeCounts = pokemons.flatMap((p) => p.types).reduce((acc, type) => {
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    const commonType = Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Unknown';

    const averageRating =
      Math.round(
        (pokemons.reduce((sum, p) => sum + (p.stats[0]?.base_stat || 0), 0) / (pokemons.length || 1)) *
          100
      ) / 100 || 0;

    const top3Pokemons = [...pokemons]
      .sort((a, b) => b.stats[0]?.base_stat - a.stats[0]?.base_stat)
      .slice(0, 3);

    const typeDistribution = pokemons.flatMap((p) => p.types).reduce((acc, type) => {
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    dispatch({
      type: 'CALCULATE_STATS',
      payload: { favoriteCount, commonType, averageRating, top3Pokemons, typeDistribution },
    });
  };

  const handlePageChange = (direction) => {
    const newOffset = direction === 'next' ? offset + limit : Math.max(offset - limit, 0);
    setOffset(newOffset);
    const newHistory = [...state.history, { action: 'pageChange', value: `offset: ${newOffset}` }];
    dispatch({ type: 'ADD_HISTORY', payload: newHistory });
    localStorage.setItem('history', JSON.stringify(newHistory));
  };

  const resetFilters = () => {
    setSearch('');
    setType('');
    setLimit(20);
    setOffset(0);
    const newHistory = [...state.history, { action: 'resetFilters', value: 'All filters reset' }];
    dispatch({ type: 'ADD_HISTORY', payload: newHistory });
    localStorage.setItem('history', JSON.stringify(newHistory));
  };

  useEffect(() => {
    const fetchAndSetPokemons = async () => {
      setLoading(true);
      try {
        const pokemons = await fetchPokemon(limit, offset);
        const detailedPokemons = await Promise.all(
          pokemons.map(async (pokemon) => {
            try {
              const res = await fetch(pokemon.url);
              const details = await res.json();
              return {
                id: details.id,
                name: details.name,
                image: details.sprites.front_default,
                types: details.types.map((t) => t.type.name),
                stats: details.stats,
              };
            } catch {
              console.error(`Failed to fetch details for ${pokemon.name}`);
              return null;
            }
          })
        );
        const validPokemons = detailedPokemons.filter(Boolean);
        dispatch({ type: 'LOAD_DATA', payload: validPokemons });
      } catch (error) {
        console.error('Failed to fetch Pokémon list:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetPokemons();
  }, [limit, offset]);

  useEffect(() => {
    calculateStats(state.filteredData);
  }, [state.filteredData]);

  useEffect(() => {
    saveFiltersToURL();
  }, [type, search, limit]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setType(urlParams.get('type') || '');
    setSearch(urlParams.get('search') || '');
    setLimit(parseInt(urlParams.get('limit')) || 20);
  }, []);

  return (
    <div>
      <PreferencesForm />
      <h1>Pokémon List</h1>
      {loading && <div>Loading...</div>}
      <button onClick={resetFilters}>Reset Filters</button>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Pokémon"
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="">All Types</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
        <option value="grass">Grass</option>
        <option value="normal">Normal</option>
      </select>
      <select value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
        <option value="20">20 results</option>
        <option value="50">50 results</option>
        <option value="100">100 results</option>
        <option value="1000000">All</option>
      </select>
      <div>
        <h2>Activity History</h2>
        <ul>
          {state.history.map((entry, index) => (
            <li key={index}>
              {entry.action}: {entry.value}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Statistics</h2>
        <div>Favorites Count: {state.stats.favoriteCount || 0}</div>
        <div>Most Common Type: {state.stats.commonType || 'Unknown'}</div>
        <div>Average Rating: {state.stats.averageRating?.toFixed(2) || '0.00'}</div>
      </div>
      <div>
        <h2>Top 3 Pokémon</h2>
        <ul>
          {state.stats.top3Pokemons?.map((pokemon) => (
            <li key={pokemon.id}>{pokemon.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Type Distribution</h2>
        <ul>
          {Object.entries(state.stats.typeDistribution || {}).map(([type, count]) => (
            <li key={type}>
              {type}: {count}
            </li>
          ))}
        </ul>
      </div>
      {/* Przekazywanie przefiltrowanych i posortowanych Pokémonów do PokemonList */}
      <PokemonList pokemons={state.filteredData} />
      <div>
        <button onClick={() => handlePageChange('prev')} disabled={offset === 0}>
          Previous
        </button>
        <button onClick={() => handlePageChange('next')}>Next</button>
      </div>
    </div>
  );
}
