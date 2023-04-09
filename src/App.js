import { useState, useEffect } from 'react'
import SearchIcon from './search.svg'
import MovieList from './MovieList';

const API_URL = 'http://www.omdbapi.com?apikey=xxxxxxxxx'

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    searchMovies('Batman');
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search)
  }

  return (
    <div className='app'>
      <h1>Movies DB</h1>

      <div className='search'>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search for movies'
        />
        <img 
          src={SearchIcon}
          alt='search'
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className='container'>
          {movies.map((movie) => (
            <MovieList movie={movie} />
          ))}
        </div>
      ) : (
        <div className='empty'>
          <h2>No Movies Found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
