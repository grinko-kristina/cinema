import React, { useState } from 'react';
import MovieCard from "./MovieCard";

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
            <input
                type="text"
                value={searchItem}
                onChange={handleInputChange}
                placeholder="Find a movie..."
            />
            <div className="movie-list">
                {
                    filteredMovies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default MovieList;