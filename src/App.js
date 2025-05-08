import './App.css';
import MovieList from './components/MovieList';
import { movies } from './data/movies';

function App() {
  return (
    <div className="App">

      <main className="app-main">
        <MovieList movies={movies} />
      </main>

    </div>
  );
}

export default App;
