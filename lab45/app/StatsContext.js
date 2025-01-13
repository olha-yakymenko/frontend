// 'use client'
// import React, { createContext, useState, useContext, useEffect } from 'react';

// // Tworzymy kontekst
// const StatsContext = createContext({
//   numberFormat: 'percentage',
//   sortBy: 'date',
//   viewType: 'table',
//   updatePreferences: () => {}
// });

// // Provider dla kontekstu
// export const StatsProvider = ({ children }) => {
//   const [numberFormat, setNumberFormat] = useState('percentage');
//   const [sortBy, setSortBy] = useState('date');
//   const [viewType, setViewType] = useState('table');

//   // Metoda do aktualizacji preferencji
//   const updatePreferences = (preferences) => {
//     if (preferences.numberFormat) setNumberFormat(preferences.numberFormat);
//     if (preferences.sortBy) setSortBy(preferences.sortBy);
//     if (preferences.viewType) setViewType(preferences.viewType);
//   };

//   return (
//     <StatsContext.Provider value={{ numberFormat, sortBy, viewType, updatePreferences }}>
//       {children}
//     </StatsContext.Provider>
//   );
// };

// // Hook do korzystania z kontekstu
// export const useStats = () => useContext(StatsContext);


// 'use client'
// import React, { createContext, useReducer, useEffect } from 'react';

// // Domyślne ustawienia
// const defaultPreferences = {
//   numberFormat: 'percentage',
//   sortBy: 'date',
//   viewType: 'table',
// };

// // Tworzenie kontekstu
// export const StatsContext = createContext({
//   ...defaultPreferences,
//   updatePreferences: () => {},
// });

// // Reducer dla zarządzania preferencjami
// const statsReducer = (state, action) => {
//   switch (action.type) {
//     case 'UPDATE_PREFERENCES':
//       return { ...state, ...action.payload };
//     default:
//       return state;
//   }
// };

// // Provider dla StatsContext
// export const StatsProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(statsReducer, defaultPreferences);

//   const updatePreferences = (preferences) => {
//     dispatch({ type: 'UPDATE_PREFERENCES', payload: preferences });
//   };

//   useEffect(() => {
//     const savedPreferences = JSON.parse(localStorage.getItem('statsPreferences'));
//     if (savedPreferences) {
//       dispatch({ type: 'UPDATE_PREFERENCES', payload: savedPreferences });
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('statsPreferences', JSON.stringify(state));
//   }, [state]);

//   return (
//     <StatsContext.Provider value={{ ...state, updatePreferences }}>
//       {children}
//     </StatsContext.Provider>
//   );
// };

//dziala?
// 'use client';
// import React, { createContext, useReducer, useEffect } from 'react';

// // Domyślne ustawienia
// const defaultPreferences = {
//   numberFormat: 'percentage',
//   sortBy: 'date',
//   viewType: 'table',
// };

// // Tworzenie kontekstu
// export const StatsContext = createContext({
//   ...defaultPreferences,
//   updatePreferences: () => {
//     console.warn('updatePreferences was called but is not defined in the context');
//   },
// });

// // Reducer dla zarządzania preferencjami
// const statsReducer = (state, action) => {
//   switch (action.type) {
//     case 'UPDATE_PREFERENCES':
//       return { ...state, ...action.payload };
//     default:
//       return state;
//   }
// };

// // Provider dla StatsContext
// export const StatsProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(statsReducer, defaultPreferences);

//   const updatePreferences = (preferences) => {
//     if (typeof preferences !== 'object' || preferences === null) {
//       console.error('updatePreferences expects an object, got:', preferences);
//       return;
//     }
//     dispatch({ type: 'UPDATE_PREFERENCES', payload: preferences });
//   };

//   useEffect(() => {
//     try {
//       const savedPreferences = JSON.parse(localStorage.getItem('statsPreferences'));
//       if (savedPreferences) {
//         dispatch({ type: 'UPDATE_PREFERENCES', payload: savedPreferences });
//       }
//     } catch (error) {
//       console.error('Failed to load preferences from localStorage:', error);
//     }
//   }, []);

//   useEffect(() => {
//     const savedPreferences = JSON.parse(localStorage.getItem('statsPreferences'));
//     if (JSON.stringify(savedPreferences) !== JSON.stringify(state)) {
//       localStorage.setItem('statsPreferences', JSON.stringify(state));
//     }
//   }, [state]);

//   return (
//     <StatsContext.Provider value={{ ...state, updatePreferences }}>
//       {children}
//     </StatsContext.Provider>
//   );
// };

// 'use client';
// import React, { createContext, useReducer, useEffect } from 'react';

// // Domyślne preferencje
// const defaultPreferences = {
//   numberFormat: 'percentage',
//   sortBy: 'name',
//   viewType: 'table',
// };

// export const StatsContext = createContext({
//   ...defaultPreferences,
//   updatePreferences: () => {},
// });

// const preferencesReducer = (state, action) => {
//   switch (action.type) {
//     case 'UPDATE_PREFERENCES':
//       return { ...state, ...action.payload };
//     case 'RESET_PREFERENCES':
//       return defaultPreferences;
//     default:
//       return state;
//   }
// };

// export const StatsProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(preferencesReducer, defaultPreferences);

//   const updatePreferences = (preferences) => {
//     dispatch({ type: 'UPDATE_PREFERENCES', payload: preferences });
//   };

//   useEffect(() => {
//     const savedPreferences = localStorage.getItem('statsPreferences');
//     if (savedPreferences) {
//       dispatch({ type: 'UPDATE_PREFERENCES', payload: JSON.parse(savedPreferences) });
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('statsPreferences', JSON.stringify(state));
//   }, [state]);

//   return (
//     <StatsContext.Provider value={{ ...state, updatePreferences }}>
//       {children}
//     </StatsContext.Provider>
//   );
// };


'use client';
import React, { createContext, useReducer, useEffect } from 'react';

// Domyślne preferencje
const defaultPreferences = {
  numberFormat: 'percentage',
  sortBy: 'name',
  viewType: 'table',
};

export const StatsContext = createContext({
  ...defaultPreferences,
  updatePreferences: () => {},
});

const preferencesReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_PREFERENCES':
      return { ...state, ...action.payload };
    case 'RESET_PREFERENCES':
      return defaultPreferences;
    default:
      return state;
  }
};

export const StatsProvider = ({ children }) => {
  // Inicjalizacja preferencji z localStorage (jeśli istnieją), w przeciwnym razie ustawienie wartości domyślnych
  const savedPreferences = typeof window !== 'undefined' && localStorage.getItem('statsPreferences');
  const initialState = savedPreferences ? JSON.parse(savedPreferences) : defaultPreferences;
  
  const [state, dispatch] = useReducer(preferencesReducer, initialState);

  const updatePreferences = (preferences) => {
    dispatch({ type: 'UPDATE_PREFERENCES', payload: preferences });
  };

  useEffect(() => {
    // Zapisz preferencje do localStorage przy każdej zmianie
    if (typeof window !== 'undefined') {
      localStorage.setItem('statsPreferences', JSON.stringify(state));
    }
  }, [state]);

  return (
    <StatsContext.Provider value={{ ...state, updatePreferences }}>
      {children}
    </StatsContext.Provider>
  );
};
