import React from 'react';

function MovieCard ({movie}) {
    const {id, name, description, genre, img, date} = movie;

    return (
        <div className="movie-card">
            <img src={img} alt={name} />
            <p>{name}</p>
            <p>{description}</p>
            <p>{genre}</p>
            <p>{date}</p>
        </div>
    )
}

export default MovieCard;