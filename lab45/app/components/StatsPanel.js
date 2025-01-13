// 'use client'
// import React, { useContext, useReducer, useEffect } from 'react';
// import { StatsContext } from '../StatsContext';
// import { statsReducer } from '../statsReducer';

// const initialState = {
//   data: [],
//   stats: {},
//   filteredData: [],
// };

// export const StatsPanel = () => {
//   const { numberFormat, sortBy, viewType } = useContext(StatsContext);
//   const [state, dispatch] = useReducer(statsReducer, initialState);

//   useEffect(() => {
//     // Wczytanie danych
//     fetch('/api/pokemon-data') // Przykładowe API
//       .then((response) => response.json())
//       .then((data) => {
//         dispatch({ type: 'LOAD_DATA', payload: data });
//         dispatch({ type: 'CALCULATE_STATS', payload: data });
//       });
//   }, []);

//   useEffect(() => {
//     // Sortowanie przy zmianie preferencji
//     dispatch({ type: 'SORT_DATA', payload: { sortBy } });
//   }, [sortBy]);

//   return (
//     <div>
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
//             {state.data.map((pokemon) => (
//               <tr key={pokemon.id}>
//                 <td>{pokemon.name}</td>
//                 <td>{pokemon.types.join(', ')}</td>
//                 <td>{pokemon.value}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <div className="cards">
//           {state.data.map((pokemon) => (
//             <div key={pokemon.id} className="card">
//               <h3>{pokemon.name}</h3>
//               <p>Types: {pokemon.types.join(', ')}</p>
//               <p>Value: {pokemon.value}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };
