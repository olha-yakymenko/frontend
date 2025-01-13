// 'use client'
// import { useState, useEffect } from 'react';

// export default function ComparePage() {
//   const [pokemon1, setPokemon1] = useState(null);
//   const [pokemon2, setPokemon2] = useState(null);
//   const [savedPokemons, setSavedPokemons] = useState([]);

//   useEffect(() => {
//     // Sprawdzamy, czy istnieją zapisane Pokémony w localStorage
//     const storedPokemons = JSON.parse(localStorage.getItem('comparison')) || [];

//     setSavedPokemons(storedPokemons);

//     // Jeśli mamy mniej niż 2 Pokémony, nie robimy nic
//     if (storedPokemons.length === 2) {
//       setPokemon1(storedPokemons[0]);
//       setPokemon2(storedPokemons[1]);
//     } else if (storedPokemons.length === 1) {
//       setPokemon1(storedPokemons[0]);
//     }
//   }, []);

//   const handleSelectPokemon = (index, pokemon) => {
//     if (index === 0) {
//       setPokemon1(pokemon);
//     } else {
//       setPokemon2(pokemon);
//     }
//   };

//   const handleRemovePokemon = (pokemonNumber) => {
//     if (pokemonNumber === 1) {
//       setPokemon1(null);
//       const updatedPokemons = savedPokemons.filter((pokemon, id) => id !== pokemonNumber);
//       localStorage.setItem('comparison', JSON.stringify(updatedPokemons));
//     } else {
//       setPokemon2(null);
//       const updatedPokemons = savedPokemons.filter((pokemon, id) => id !== pokemonNumber);
//       localStorage.setItem('comparison', JSON.stringify(updatedPokemons));
//     }
//   };
//   const handleRemoveCompare = () => {
//       setPokemon1(null);
//       setPokemon2(null);
//       localStorage.removeItem('comparison');
//   };

//   return (
//     <div>
//       <h1>Compare Two Pokémon</h1>

//       <div>
//         <h2>Select Pokémon to Compare</h2>
//         <div>
//           {savedPokemons.length > 0 ? (
//             savedPokemons.map((pokemon, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleSelectPokemon(index % 2, pokemon)} // Rotujemy pomiędzy pokemon1 a pokemon2
//               >
//                 {pokemon.name}
//               </button>
//             ))
//           ) : (
//             <p>No Pokémon saved for comparison.</p>
//           )}
//         </div>
//       </div>

//       <div className="pokemon-comparison">
//         {pokemon1 && pokemon2 ?  (
//           <div className="comparison-details">
//             <div className="pokemon">
//               <h2>{pokemon1.name}</h2>
//               <img src={pokemon1.image} alt={pokemon1.name} />
//               <p>Types: {pokemon1.types}</p>
//               <p>Weight: {pokemon1.weight}</p>
//               <p>Height: {pokemon1.height}</p>
//               <p>Stats: </p>
//               <ul>
//                 {pokemon1.stats.length > 0 ? (
//                   pokemon1.stats.map((stat, id) => (
//                     <li key={id}>{stat.stat.name}: {stat.base_stat}</li>
//                   ))
//                 ) : (
//                   <li>Brak dostępnych statystyk dla tego Pokémona.</li>
//                 )}
//               </ul>
//               <button onClick={() => handleRemovePokemon(1)}>Remove {pokemon1.name} from comparison</button>
//             </div>
//             <div className="vs">VS</div>
//             <div className="pokemon">
//               <h2>{pokemon2.name}</h2>
//               <img src={pokemon2.image} alt={pokemon2.name} />
//               <p>Types: {pokemon2.types}</p>
//               <p>Weight: {pokemon2.weight}</p>
//               <p>Height: {pokemon2.height}</p>
//               <p>Stats: </p>
//               <ul>
//                 {pokemon2.stats.length > 0 ? (
//                   pokemon2.stats.map((stat, id) => (
//                     <li key={id}>{stat.stat.name}: {stat.base_stat}</li>
//                   ))
//                 ) : (
//                   <li>Brak dostępnych statystyk dla tego Pokémona.</li>
//                 )}
//               </ul>
//               <button onClick={() => handleRemovePokemon(2)}>Remove {pokemon2.name} from comparison</button>
//             </div>
//           </div>
//         ) : (
//           <p>Select two Pokémon to compare.</p>
//         )}

//         {/* Jeśli wybrano tylko jeden Pokémon, wyświetlamy go i zachęcamy do wyboru drugiego */}
//         {pokemon1 && !pokemon2 && (
//           <div className="pokemon">
//             <h2>{pokemon1.name}</h2>
//             <img src={pokemon1.image} alt={pokemon1.name} />
//             <p>Types: {pokemon1.types}</p>
//             <p>Weight: {pokemon1.weight}</p>
//             <p>Height: {pokemon1.height}</p>
//             <p>Stats: </p>
//             <ul>
//               {pokemon1.stats.length > 0 ? (
//                 pokemon1.stats.map((stat, id) => (
//                   <li key={id}>{stat.stat.name}: {stat.base_stat}</li>
//                 ))
//               ) : (
//                 <li>Brak dostępnych statystyk dla tego Pokémona.</li>
//               )}
//             </ul>
//             <button onClick={() => handleRemovePokemon(1)}>Remove {pokemon1.name} from comparison</button>
//           </div>
//         )}

//         {pokemon2 && !pokemon1 && (
//           <div className="pokemon">
//             <h2>{pokemon2.name}</h2>
//             <img src={pokemon2.image} alt={pokemon2.name} />
//             <p>Types: {pokemon2.types}</p>
//             <p>Weight: {pokemon2.weight}</p>
//             <p>Height: {pokemon2.height}</p>
//             <p>Stats: </p>
//             <ul>
//               {pokemon2.stats.length > 0 ? (
//                 pokemon2.stats.map((stat, id) => (
//                   <li key={id}>{stat.stat.name}: {stat.base_stat}</li>
//                 ))
//               ) : (
//                 <li>Brak dostępnych statystyk dla tego Pokémona.</li>
//               )}
//             </ul>
//             <button onClick={() => handleRemovePokemon(2)}>Remove {pokemon2.name} from comparison</button>
//           </div>
//         )}
//         <button onClick={() => handleRemoveCompare()}>Remove comparison</button>
//       </div>
//     </div>
//   );
// }



// 'use client';
// import { useState, useEffect } from 'react';
// import '../../../css/3.css'
// export default function ComparePage() {
//   const [pokemon1, setPokemon1] = useState(null);
//   const [pokemon2, setPokemon2] = useState(null);
//   const [savedPokemons, setSavedPokemons] = useState([]);
//   const [previousComparison, setPreviousComparison] = useState(null);
//   const [currentComparison, setCurrentComparison] = useState(null);

//   useEffect(() => {
//     // Load saved Pokémon comparisons from localStorage
//     const storedPokemons = JSON.parse(localStorage.getItem('comparison')) || [];
//     setSavedPokemons(storedPokemons);

//     if (storedPokemons.length === 2) {
//       setPokemon1(storedPokemons[0]);
//       setPokemon2(storedPokemons[1]);
//       setCurrentComparison([storedPokemons[0], storedPokemons[1]]);
//     } else if (storedPokemons.length === 1) {
//       setPokemon1(storedPokemons[0]);
//       setCurrentComparison([storedPokemons[0], null]);
//     }

//     // Load previous comparison
//     const previous = JSON.parse(localStorage.getItem('previousComparison'));
//     if (previous) {
//       setPreviousComparison(previous);
//     }
//   }, []);

//   const handleSelectPokemon = (index, pokemon) => {
//     if (index === 0) {
//       setPokemon1(pokemon);
//     } else {
//       setPokemon2(pokemon);
//     }
//     const updatedComparison = index === 0 ? [pokemon, pokemon2] : [pokemon1, pokemon];
//     setCurrentComparison(updatedComparison);
//     saveComparison(updatedComparison);
//   };

//   const saveComparison = (comparison) => {
//     const updatedComparison = comparison.filter(Boolean); // Filter out nulls
//     setSavedPokemons(updatedComparison);
//     localStorage.setItem('comparison', JSON.stringify(updatedComparison));
//   };

//   const handleRemovePokemon = (pokemonNumber) => {
//     if (pokemonNumber === 1) {
//       setPokemon1(null);
//       const updatedComparison = [null, pokemon2];
//       setCurrentComparison(updatedComparison);
//       saveComparison(updatedComparison);
//     } else {
//       setPokemon2(null);
//       const updatedComparison = [pokemon1, null];
//       setCurrentComparison(updatedComparison);
//       saveComparison(updatedComparison);
//     }
//   };

//   const handleRemoveCompare = () => {
//     // Save current comparison to previous
//     if (pokemon1 && pokemon2) {
//       const currentComparisonData = [pokemon1, pokemon2];
//       setPreviousComparison(currentComparisonData);
//       localStorage.setItem('previousComparison', JSON.stringify(currentComparisonData));
//     }

//     setPokemon1(null);
//     setPokemon2(null);
//     setSavedPokemons([]);
//     setCurrentComparison(null);
//     localStorage.removeItem('comparison');
//   };

//   const handleRestorePreviousComparison = () => {
//     if (previousComparison) {
//       setPokemon1(previousComparison[0]);
//       setPokemon2(previousComparison[1]);
//       setCurrentComparison(previousComparison);
//     }
//   };

//   const handleRestoreCurrentComparison = () => {
//     if (currentComparison) {
//       setPokemon1(currentComparison[0]);
//       setPokemon2(currentComparison[1]);
//     }
//   };

//   return (
//     <div>
//       <h1>Compare Two Pokémon</h1>

//       <div>
//         <h2>Select Pokémon to Compare</h2>
//         <div>
//           {savedPokemons.length > 0 ? (
//             savedPokemons.map((pokemon, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleSelectPokemon(index % 2, pokemon)}
//               >
//                 {pokemon.name}
//               </button>
//             ))
//           ) : (
//             <p>No Pokémon saved for comparison.</p>
//           )}
//         </div>
//       </div>

//       <div className="pokemon-comparison">
//         {pokemon1 && pokemon2 ? (
//           <div className="comparison-details">
//             <h2>Comparison Table</h2>
//             <table>
//               <thead>
//                 <tr>
//                   <th>Attribute</th>
//                   <th>{pokemon1.name}</th>
//                   <th>{pokemon2.name}</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>Type</td>
//                   <td>{pokemon1.types}</td>
//                   <td>{pokemon2.types}</td>
//                 </tr>
//                 <tr>
//                   <td>Weight</td>
//                   <td>{pokemon1.weight}</td>
//                   <td>{pokemon2.weight}</td>
//                 </tr>
//                 <tr>
//                   <td>Height</td>
//                   <td>{pokemon1.height}</td>
//                   <td>{pokemon2.height}</td>
//                 </tr>
//                 {pokemon1.stats.map((stat, index) => (
//                   <tr key={index}>
//                     <td>{stat.stat.name}</td>
//                     <td>{stat.base_stat}</td>
//                     <td>{pokemon2.stats[index]?.base_stat || 'N/A'}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             <button onClick={handleRemoveCompare}>Clear Comparison</button>
//           </div>
//         ) : (
//           <p>Select two Pokémon to compare.</p>
//         )}

//         {previousComparison && (
//           <div className="previous-comparison">
//             <h2>Previous Comparison</h2>
//             <button onClick={handleRestorePreviousComparison}>Restore Previous Comparison</button>
//           </div>
//         )}

//         {currentComparison && previousComparison && (
//           <div className="current-comparison">
//             <button onClick={handleRestoreCurrentComparison}>Back to Current Comparison</button>
//           </div>
//         )}

//         {pokemon1 && !pokemon2 && (
//           <div className="pokemon">
//             <h2>{pokemon1.name}</h2>
//             <img src={pokemon1.image} alt={pokemon1.name} />
//             <p>Types: {pokemon1.types}</p>
//             <p>Weight: {pokemon1.weight}</p>
//             <p>Height: {pokemon1.height}</p>
//             <p>Stats: </p>
//             <ul>
//               {pokemon1.stats.map((stat, id) => (
//                 <li key={id}>{stat.stat.name}: {stat.base_stat}</li>
//               ))}
//             </ul>
//             <button onClick={() => handleRemovePokemon(1)}>Remove {pokemon1.name} from comparison</button>
//           </div>
//         )}

//         {pokemon2 && !pokemon1 && (
//           <div className="pokemon">
//             <h2>{pokemon2.name}</h2>
//             <img src={pokemon2.image} alt={pokemon2.name} />
//             <p>Types: {pokemon2.types}</p>
//             <p>Weight: {pokemon2.weight}</p>
//             <p>Height: {pokemon2.height}</p>
//             <p>Stats: </p>
//             <ul>
//               {pokemon2.stats.map((stat, id) => (
//                 <li key={id}>{stat.stat.name}: {stat.base_stat}</li>
//               ))}
//             </ul>
//             <button onClick={() => handleRemovePokemon(2)}>Remove {pokemon2.name} from comparison</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



'use client';
import { useState, useEffect } from 'react';
import '../../../css/3.css';

export default function ComparePage() {
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);
  const [savedPokemons, setSavedPokemons] = useState([]);
  const [previousComparison, setPreviousComparison] = useState(null);
  const [currentComparison, setCurrentComparison] = useState(null);

  useEffect(() => {
    const storedPokemons = JSON.parse(localStorage.getItem('comparison')) || [];
    setSavedPokemons(storedPokemons);

    if (storedPokemons.length === 2) {
      setPokemon1(storedPokemons[0]);
      setPokemon2(storedPokemons[1]);
      setCurrentComparison([storedPokemons[0], storedPokemons[1]]);
    } else if (storedPokemons.length === 1) {
      setPokemon1(storedPokemons[0]);
      setCurrentComparison([storedPokemons[0], null]);
    }

    const previous = JSON.parse(localStorage.getItem('previousComparison'));
    if (previous) {
      setPreviousComparison(previous);
    }
  }, []);


  const saveComparison = (comparison) => {
    const updatedComparison = comparison.filter(Boolean); 
    setSavedPokemons(updatedComparison);
    localStorage.setItem('comparison', JSON.stringify(updatedComparison));
  };

  const handleRemovePokemon = (pokemonNumber) => {
    if (pokemonNumber === 0) {
      setPokemon1(null);
      const updatedComparison = [null, pokemon2];
      setCurrentComparison(updatedComparison);
      saveComparison(updatedComparison);
    } else {
      setPokemon2(null);
      const updatedComparison = [pokemon1, null];
      setCurrentComparison(updatedComparison);
      saveComparison(updatedComparison);
    }
  };

  const handleRemoveCompare = () => {
    if (pokemon1 && pokemon2) {
      const currentComparisonData = [pokemon1, pokemon2];
      setPreviousComparison(currentComparisonData);
      localStorage.setItem('previousComparison', JSON.stringify(currentComparisonData));
    }
  
    setPokemon1(null);
    setPokemon2(null);
    setSavedPokemons([]);
    setCurrentComparison(null);
    localStorage.removeItem('comparison');
  };
  
  const handleRestorePreviousComparison = () => {
    if (previousComparison) {
      setPokemon1(previousComparison[0]);
      setPokemon2(previousComparison[1]);
    }
  };
  
  const handleRestoreCurrentComparison = () => {
    if (currentComparison) {
      setPokemon1(currentComparison[0]);
      setPokemon2(currentComparison[1]);
    }
  };
  
  
  return (
    <div>
      <div>
        <div>
          {savedPokemons.length > 0 ? (
            savedPokemons.map((pokemon, index) => (
              <button
                key={index}
                onClick={() => handleRemovePokemon(index, pokemon)}
              >
                {pokemon.name}
              </button>
            ))
          ) : (
            <p>No Pokémon saved for comparison.</p>
          )}
        </div>
      </div>

      <div className="pokemon-comparison">
        {pokemon1 && pokemon2 ? (
          <div className="comparison-details">
            <h2>Comparison Table</h2>
            <table>
              <thead>
                <tr>
                  <th>Attribute</th>
                  <th>{pokemon1.name}</th>
                  <th>{pokemon2.name}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Type</td>
                  <td>{pokemon1.types}</td>
                  <td>{pokemon2.types}</td>
                </tr>
                <tr>
                  <td>Weight</td>
                  <td>{pokemon1.weight}</td>
                  <td>{pokemon2.weight}</td>
                </tr>
                <tr>
                  <td>Height</td>
                  <td>{pokemon1.height}</td>
                  <td>{pokemon2.height}</td>
                </tr>
                {pokemon1.stats.map((stat, index) => (
                  <tr key={index}>
                    <td>{stat.stat.name}</td>
                    <td>{stat.base_stat}</td>
                    <td>{pokemon2.stats[index]?.base_stat || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={handleRemoveCompare}>Clear Comparison</button>
          </div>
        ) : (
          <p>Select two Pokémon to compare.</p>
        )}

        {previousComparison && (
          <div className="previous-comparison">
            <button onClick={handleRestorePreviousComparison}>Restore Previous Comparison</button>
          </div>
        )}

        {currentComparison && previousComparison && (
          <div className="current-comparison">
            <button onClick={handleRestoreCurrentComparison}>Back to Current Comparison</button>
          </div>
        )}

        {pokemon1 && !pokemon2 && (
          <div className="pokemon">
            <h2>{pokemon1.name}</h2>
            <img src={pokemon1.image} alt={pokemon1.name} />
            <p>Types: {pokemon1.types}</p>
            <p>Weight: {pokemon1.weight}</p>
            <p>Height: {pokemon1.height}</p>
            <p>Stats: </p>
            <ul>
              {pokemon1.stats.map((stat, id) => (
                <li key={id}>{stat.stat.name}: {stat.base_stat}</li>
              ))}
            </ul>
            <button onClick={() => handleRemovePokemon(1)}>Remove {pokemon1.name} from comparison</button>
          </div>
        )}

        {pokemon2 && !pokemon1 && (
          <div className="pokemon">
            <h2>{pokemon2.name}</h2>
            <img src={pokemon2.image} alt={pokemon2.name} />
            <p>Types: {pokemon2.types}</p>
            <p>Weight: {pokemon2.weight}</p>
            <p>Height: {pokemon2.height}</p>
            <p>Stats: </p>
            <ul>
              {pokemon2.stats.map((stat, id) => (
                <li key={id}>{stat.stat.name}: {stat.base_stat}</li>
              ))}
            </ul>
            <button onClick={() => handleRemovePokemon(2)}>Remove {pokemon2.name} from comparison</button>
          </div>
        )}
      </div>
    </div>
  );
}
