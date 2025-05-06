import React, { useState } from 'react';
import MovieCard from "./MovieCard";

function MovieList({ movies }) {

    return (
        <div className="movie-list-container">
            <div className="movie-list">
                {
                    movies.map((movie) => (
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