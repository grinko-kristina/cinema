import './App.css';
import MovieList from './components/MovieList';
import { movies } from './data/movies';

function App() {
  return (
      <div className="App">
        <h1>Movie Library</h1>
        <MovieList movies={movies} />
      </div>
  );
}

export default App;
