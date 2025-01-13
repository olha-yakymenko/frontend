'use client'
import React, { useState } from 'react';
import { useStats } from './StatsContext'; // Korzystamy z kontekstu

const PreferencesForm = () => {
  const { numberFormat, sortBy, viewType, updatePreferences } = useStats(); // Hook do kontekstu
  const [localNumberFormat, setLocalNumberFormat] = useState(numberFormat);
  const [localSortBy, setLocalSortBy] = useState(sortBy);
  const [localViewType, setLocalViewType] = useState(viewType);

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePreferences({
      numberFormat: localNumberFormat,
      sortBy: localSortBy,
      viewType: localViewType,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Number Format:</label>
        <select
          value={localNumberFormat}
          onChange={(e) => setLocalNumberFormat(e.target.value)}
        >
          <option value="percentage">Percentage</option>
          <option value="decimal">Decimal</option>
          <option value="rounded">Rounded</option>
        </select>
      </div>

      <div>
        <label>Sort By:</label>
        <select
          value={localSortBy}
          onChange={(e) => setLocalSortBy(e.target.value)}
        >
          <option value="date">Date</option>
          <option value="name">Name</option>
        </select>
      </div>

      <div>
        <label>View Type:</label>
        <select
          value={localViewType}
          onChange={(e) => setLocalViewType(e.target.value)}
        >
          <option value="table">Table</option>
          <option value="cards">Cards</option>
        </select>
      </div>

      <button type="submit">Save Preferences</button>
    </form>
  );
};

export default PreferencesForm;
