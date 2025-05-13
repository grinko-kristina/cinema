import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CinemaHall from "../components/CinemaHall";
import { useParams } from "react-router-dom";
import { movies } from "../data/movies";
import "../styles/Booking.css";

function Booking() {
    const { id } = useParams();
    const movie = movies.find(movie => movie.id === id);

    return (
        <>
            <Header />
            <div className="booking-container">
                <h1>Book Your Tickets</h1>

                {movie && (
                    <div className="movie-details">
                        <div className="movie-poster">
                            <img src={movie.img} alt={movie.name} />
                        </div>
                        <div className="movie-info">
                            <h2>{movie.name}</h2>
                            <div className="movie-genre">{movie.genre}</div>
                            <p className="movie-description">{movie.description}</p>
                        </div>
                    </div>
                )}

                <CinemaHall />
            </div>
            <Footer />
        </>
    );
}

export default Booking;
