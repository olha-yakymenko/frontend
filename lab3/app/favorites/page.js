

'use client';

import { useState } from 'react';

export default function FavoritesPage() {
  // Sprawdzamy, czy kod działa po stronie klienta
  const [isClient, setIsClient] = useState(false);
  
  // Inicjalizujemy favorites tylko po stronie klienta
  const [favorites, setFavorites] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('favorites');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  // Po stronie klienta ustawiamy flagę
  if (!isClient && typeof window !== 'undefined') {
    setIsClient(true);
  }

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== id);
    setFavorites(updatedFavorites);  // Zaktualizuj stan
    if (typeof window !== 'undefined') {
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));  // Zapisz zaktualizowane ulubione Pokémony do localStorage
    }
  };

  // Renderowanie tylko po stronie klienta
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
