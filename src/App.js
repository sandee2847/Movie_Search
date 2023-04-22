import React, { useState } from "react";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);

  function handleSearchQueryChange(event) {
    setSearchQuery(event.target.value);
  }

  function handleSearchQuerySubmit(event) {
    event.preventDefault();

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=6f1fd080d76e7e88d084ca557506456a&query=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => setMovies(data.results))
      .catch((error) => console.error(error));
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <h1>Movie Search</h1>
        <form onSubmit={handleSearchQuerySubmit}>
          <label>
            Search for movies:
            <input type="text" value={searchQuery} onChange={handleSearchQueryChange} />
          </label>
          <button type="submit">Search</button>
        </form>
      </div>
      {movies.map((movie) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} key={movie.id}>
          <h2>{movie.title}</h2>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <p>{movie.overview}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
