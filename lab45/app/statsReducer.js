export const statsReducer = (state, action) => {
    switch (action.type) {
      case 'LOAD_DATA':
        return { ...state, data: action.payload };
      case 'CALCULATE_STATS':
        // Przykład obliczania statystyk (liczba ulubionych):
        const favoritesCount = action.payload.filter((item) => item.isFavorite).length;
        return { ...state, stats: { ...state.stats, favoritesCount } };
      case 'SORT_DATA':
        const sortedData = [...state.data].sort((a, b) => {
          if (action.payload.sortBy === 'name') return a.name.localeCompare(b.name);
          if (action.payload.sortBy === 'date') return new Date(b.date) - new Date(a.date);
          return 0;
        });
        return { ...state, data: sortedData };
      case 'FILTER_DATA':
        const filteredData = state.data.filter((item) => item.type === action.payload.type);
        return { ...state, filteredData };
      default:
        return state;
    }
  };
  