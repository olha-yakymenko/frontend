// import Link from 'next/link';
// import '../../css/2.css'
// export default function PokemonList({ pokemons }) {
//   console.log(pokemons)
//   return (
//     <div>
//       <ul>
//         {pokemons.map(pokemon => {
//           const pokemonId = pokemon.id
//           console.log(pokemonId)
//           return (
//             <li key={pokemon.name}>
//               <Link href={`/pokemon/${pokemonId}`}>
//                 <img src={pokemon.image} alt={pokemon.name} width={50} height={50} />
//                 <h3>{pokemon.name} (ID: {pokemonId})</h3>
//               </Link>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }



//dziala?
// import Link from 'next/link';
// import '../../css/2.css';

// export default function PokemonList({ pokemons, formatNumber, viewType, sortBy }) {
//   console.log(viewType)
//   const sortPokemons = (pokemons) => {
//     if (sortBy === 'name') {
//       return pokemons.sort((a, b) => a.name.localeCompare(b.name));
//     } else if (sortBy === 'value') {
//       return pokemons.sort((a, b) => a.stats.attack - b.stats.attack); // Przykład sortowania po statystyce
//     }
//     return pokemons;
//   };
//   const sortedData=sortPokemons(pokemons)

//   const renderGridView = () => (
//     <ul style={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none' }}>
//       {sortedData.map(pokemon => {
//         const pokemonId = pokemon.id;
//         return (
//           <li
//             key={pokemonId}
//             style={{
//               display: 'inline-block',
//               margin: '10px',
//               width: '200px',
//               textAlign: 'center',
//               border: '1px solid #ddd',
//               padding: '10px',
//             }}
//           >
//             <Link href={`/pokemon/${pokemonId}`}>
//               <img src={pokemon.image} alt={pokemon.name} width={50} height={50} />
//               <h3>{pokemon.name} (ID: {pokemonId})</h3>
//               <div>
//                 <p>Attack: {formatNumber(pokemon.stats.find(stat => stat.stat.name === 'attack')?.base_stat || 0)}</p>
//                 <p>Defense: {formatNumber(pokemon.stats.find(stat => stat.stat.name === 'defense')?.base_stat || 0)}</p>
//               </div>
//             </Link>
//           </li>
//         );
//       })}
//     </ul>
//   );

//   const renderTableView = () => (
//     <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//       <thead>
//         <tr>
//           <th>Image</th>
//           <th>Name</th>
//           <th>Attack</th>
//           <th>Defense</th>
//         </tr>
//       </thead>
//       <tbody>
//         {sortedData.map(pokemon => {
//           const pokemonId = pokemon.id;
//           return (
//             <tr key={pokemonId}>
//               <td>
//                 <Link href={`/pokemon/${pokemonId}`}>
//                   <img src={pokemon.image} alt={pokemon.name} width={50} height={50} />
//                 </Link>
//               </td>
//               <td>
//                 <Link href={`/pokemon/${pokemonId}`}><h3>{pokemon.name} (ID: {pokemonId})</h3></Link>
//               </td>
//               <td>
//                 {formatNumber(pokemon.stats.find(stat => stat.stat.name === 'attack')?.base_stat || 0)}
//               </td>
//               <td>
//                 {formatNumber(pokemon.stats.find(stat => stat.stat.name === 'defense')?.base_stat || 0)}
//               </td>
//             </tr>
//           );
//         })}
//       </tbody>
//     </table>
//   );

//   return <div>{viewType === 'cards' ? renderGridView() : renderTableView()}</div>;
// }



import { useContext } from 'react';
import { StatsContext } from '../StatsContext';  // Import StatsContext
import Link from 'next/link';
import '../../css/2.css';

export default function PokemonList({ pokemons }) {
  const { sortBy, viewType, numberFormat } = useContext(StatsContext);  // Get preferences from context
  console.log(numberFormat);

  // Sorting logic
  // const sortPokemons = (pokemons) => {
  //   if (sortBy === 'name') {
  //     return pokemons.sort((a, b) => a.name.localeCompare(b.name));
  //   } else if (sortBy === 'id') {
  //     return pokemons.sort((a, b) => a.id - b.id);
  //   } else if (sortBy === 'attack') {
  //     return pokemons.sort((a, b) => {
  //       const aAttack = a.stats.find(stat => stat.stat.name === 'attack')?.base_stat || 0;
  //       const bAttack = b.stats.find(stat => stat.stat.name === 'attack')?.base_stat || 0;
  //       return bAttack - aAttack;  // Sorting by attack in descending order
  //     });
  //   }
  //   return pokemons;
  // };

  // const sortedData = sortPokemons(pokemons);  // Sort the Pokémon based on context preferences

  // Function to format the number based on numberFormat preference
  const formatStatValue = (value) => {
    if (numberFormat === 'percentage') {
      return `${(value * 100).toFixed(2)}%`; // Format as percentage
    } else if (numberFormat === 'decimal') {
      return value.toFixed(2); // Format as decimal with 2 decimal places
    } else if (numberFormat === 'rounded') {
      return Math.round(value); // Round the value to the nearest integer
    }
    return value; // Default: return as is if no valid format
  };

  const renderGridView = () => (
    <ul style={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none' }}>
      {pokemons.map(pokemon => {
        const pokemonId = pokemon.id;
        return (
          <li
            key={pokemonId}
            style={{
              display: 'inline-block',
              margin: '10px',
              width: '200px',
              textAlign: 'center',
              border: '1px solid #ddd',
              padding: '10px',
            }}
          >
            <Link href={`/pokemon/${pokemonId}`}>
              <img src={pokemon.image} alt={pokemon.name} width={50} height={50} />
              <h3>{pokemon.name} (ID: {pokemonId})</h3>
              <div>
                <p>Attack: {formatStatValue(pokemon.stats.find(stat => stat.stat.name === 'attack')?.base_stat || 0)}</p>
                <p>Defense: {formatStatValue(pokemon.stats.find(stat => stat.stat.name === 'defense')?.base_stat || 0)}</p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );

  const renderTableView = () => (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Attack</th>
          <th>Defense</th>
        </tr>
      </thead>
      <tbody>
        {pokemons.map(pokemon => {
          const pokemonId = pokemon.id;
          return (
            <tr key={pokemonId}>
              <td>
                <Link href={`/pokemon/${pokemonId}`}>
                  <img src={pokemon.image} alt={pokemon.name} width={50} height={50} />
                </Link>
              </td>
              <td>
                <Link href={`/pokemon/${pokemonId}`}>
                  <h3>{pokemon.name} (ID: {pokemonId})</h3>
                </Link>
              </td>
              <td>
                {formatStatValue(pokemon.stats.find(stat => stat.stat.name === 'attack')?.base_stat || 0)}
              </td>
              <td>
                {formatStatValue(pokemon.stats.find(stat => stat.stat.name === 'defense')?.base_stat || 0)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  return <div>{viewType === 'cards' ? renderGridView() : renderTableView()}</div>;
}
