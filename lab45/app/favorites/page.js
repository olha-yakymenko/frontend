

'use client';

import { useState } from 'react';

export default function FavoritesPage() {
  const [isClient, setIsClient] = useState(false);
  
  const [favorites, setFavorites] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('favorites');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  if (!isClient && typeof window !== 'undefined') {
    setIsClient(true);
  }

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== id);
    setFavorites(updatedFavorites);  
    if (typeof window !== 'undefined') {
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));  
    }
  };

  if (!isClient) return <div>Loading...</div>;

  return (
    <div className="favorites-page">
      {favorites.length > 0 ? (
        <div className="favorites-list">
          {favorites.map((pokemon, index) => (
            <div key={pokemon.id || index} className="favorite-item">
              <img src={pokemon.image} alt={pokemon.name} />
              <h3>{pokemon.name}</h3>
              <button onClick={() => removeFavorite(pokemon.id)}>Usuń</button>
            </div>
          ))}
        </div>
      ) : (
        <p>Nie masz ulubionych Pokémonów.</p>
      )}
    </div>
  );
}
