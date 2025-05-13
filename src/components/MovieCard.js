import React from 'react';
import '../styles/MovieCard.css';
import {useNavigate} from "react-router-dom";

function MovieCard ({movie}) {
    const {id, name, description, genre, img, date} = movie;

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/booking/${id}`);
    }

    return (
        <div className="movie-card">
            <div className="movie-card-image-wrapper">
                <img src={img} alt={name} />
                <div className="movie-card-overlay">
                    <a className="movie-card-overlay-play-button" onClick={handleClick}>Book Now</a>
                </div>
            </div>
            <div className="movie-card-info">
                <h3 className="movie-card-title">{name}</h3>
                <div className="movie-card-details">
                    <span className="movie-card-genre">{genre}</span>
                    {date && <span className="movie-card-year">{date}</span>}
                    <p>{description.substring(0, 100)}...</p>
                </div>
            </div>
        </div>
    )
}

export default MovieCard;
