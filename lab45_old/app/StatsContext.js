'use client'
import React, { createContext, useState, useContext, useEffect } from 'react';

// Tworzymy kontekst
const StatsContext = createContext({
  numberFormat: 'percentage',
  sortBy: 'date',
  viewType: 'table',
  updatePreferences: () => {}
});

// Provider dla kontekstu
export const StatsProvider = ({ children }) => {
  const [numberFormat, setNumberFormat] = useState('percentage');
  const [sortBy, setSortBy] = useState('date');
  const [viewType, setViewType] = useState('table');

  // Metoda do aktualizacji preferencji
  const updatePreferences = (preferences) => {
    if (preferences.numberFormat) setNumberFormat(preferences.numberFormat);
    if (preferences.sortBy) setSortBy(preferences.sortBy);
    if (preferences.viewType) setViewType(preferences.viewType);
  };

  return (
    <StatsContext.Provider value={{ numberFormat, sortBy, viewType, updatePreferences }}>
      {children}
    </StatsContext.Provider>
  );
};

// Hook do korzystania z kontekstu
export const useStats = () => useContext(StatsContext);
