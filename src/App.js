import './App.css';
import { movies } from './data/movies';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home.js';
import Booking from './pages/Booking.js';

function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
                <Route path='/' element={<Home movies={movies} />} />
                <Route path='/booking/:id' element={<Booking />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
