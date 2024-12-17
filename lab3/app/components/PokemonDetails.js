
'use client';

export default function PokemonDetails({ pokemon }) {
  // Sprawdzenie, czy w przeglądarce istnieje localStorage i pobranie zapisanych ulubionych
  let storedFavorites = [];
  if (typeof window !== 'undefined') {
    storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  }

  // Funkcja obsługująca dodawanie lub usuwanie z ulubionych
  const handleFavorite = (pokemon) => {
    let updatedFavorites = [];
    
    // Sprawdzamy, czy Pokémon jest już w ulubionych
    if (storedFavorites.some(fav => fav.name === pokemon.name)) {
      // Jeśli tak, usuwamy go z ulubionych
      updatedFavorites = storedFavorites.filter(fav => fav.name !== pokemon.name);
    } else {
      // Jeśli nie, dodajemy go do ulubionych
      updatedFavorites = [...storedFavorites, { id: pokemon.id, image: pokemon.image, name: pokemon.name }];
    }

    // Zapisujemy zmienioną listę do localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }

    // Ponownie odczytujemy listę ulubionych z localStorage, aby zaktualizować UI
    storedFavorites = updatedFavorites;
  };

  // Sprawdzamy, czy Pokémon jest już w ulubionych
  const isFavorite = storedFavorites.some(fav => fav.name === pokemon.name);

  if (!pokemon) return <div>Loading...</div>;

  return (
    <div className="pokemon-details active">
      <h1>{pokemon.id}</h1>
      <h3>{pokemon.name}</h3>
      <img src={pokemon.image} alt={pokemon.name} />
      <h2>Typy:</h2>
      <ul>
        {pokemon.types.length > 0 ? (
          pokemon.types.map((type, id) => <li key={id}>{type}</li>)
        ) : (
          <li>Brak dostępnych typów dla tego Pokémona.</li>
        )}
      </ul>
      <h2>Statystyki:</h2>
      <ul>
        {pokemon.stats.length > 0 ? (
          pokemon.stats.map((stat, id) => (
            <li key={id}>{stat.stat.name}: {stat.base_stat}</li>
          ))
        ) : (
          <li>Brak dostępnych statystyk dla tego Pokémona.</li>
        )}
      </ul>
      <h2>Wzrost:</h2>
      <p>{pokemon.height ? pokemon.height : "Brak danych"}</p>
      <h2>Waga:</h2>
      <p>{pokemon.weight ? pokemon.weight : "Brak danych"}</p>

      <button onClick={() => handleFavorite(pokemon)}>
        {isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
      </button>
    </div>
  );
}

