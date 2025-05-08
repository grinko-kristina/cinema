import React, { useState } from 'react';
import MovieCard from "./MovieCard";
import '../styles/MovieList.css';

function MovieList({ movies }) {
    const [searchItem, setSearchItem] = useState("");
    const [filteredMovies, setFilteredMovies] = useState(movies);

    const handleInputChange = (e) => {
        const searchTerm = e.target.value;
        setSearchItem(searchTerm)

        const filteredItems = movies.filter((movie) =>
            movie.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredMovies(filteredItems);
    }

    return (
        <div className="movie-list-container">
            <div className="page-header">
                <h1>CinemaHub</h1>
                <p>Find your next favorite film from our curated collection</p>
            </div>

            <div className="search-filter-bar">
                <input
                    className="search-input"
                    type="text"
                    value={searchItem}
                    onChange={handleInputChange}
                    placeholder="Find a movie..."
                />
            </div>

            <div className="movie-list">
                {filteredMovies.length > 0 ? (
                    filteredMovies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                        />
                    ))
                ) : (
                    <div className="movie-list-empty">
                        <h3>No movies found</h3>
                        <p>Try adjusting your search criteria or browse our full collection.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MovieList;
