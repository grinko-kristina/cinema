import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CinemaHall from "../components/CinemaHall";
import { useParams } from "react-router-dom";
import { movies } from "../data/movies";
import "../styles/Booking.css";

function Booking() {
    const { id } = useParams();
    const movie = movies.find(movie => movie.id === id);

    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [availableTimes, setAvailableTimes] = useState([]);

    useEffect(() => {
        if (movie && movie.showTimes && movie.showTimes.length > 0) {
            const firstDate = movie.showTimes[0].date;
            setSelectedDate(firstDate);
        }
    }, [movie]);

    useEffect(() => {
        if (selectedDate && movie && movie.showTimes) {
            const dateInfo = movie.showTimes.find(st => st.date === selectedDate);
            if (dateInfo && dateInfo.times.length > 0) {
                setAvailableTimes(dateInfo.times);
                setSelectedTime(dateInfo.times[0]);
            } else {
                setAvailableTimes([]);
                setSelectedTime("");
            }
        }
    }, [selectedDate, movie]);

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleTimeChange = (e) => {
        setSelectedTime(e.target.value);
    };

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

                {movie && movie.showTimes && (
                    <div className="session-selection">
                        <div className="session-date">
                            <label htmlFor="date-select">Select Date:</label>
                            <select 
                                id="date-select" 
                                value={selectedDate} 
                                onChange={handleDateChange}
                            >
                                {movie.showTimes.map(showTime => (
                                    <option key={showTime.date} value={showTime.date}>
                                        {new Date(showTime.date).toLocaleDateString('en-US', { 
                                            weekday: 'long', 
                                            year: 'numeric', 
                                            month: 'long', 
                                            day: 'numeric' 
                                        })}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="session-time">
                            <label htmlFor="time-select">Select Time:</label>
                            <select 
                                id="time-select" 
                                value={selectedTime} 
                                onChange={handleTimeChange}
                                disabled={availableTimes.length === 0}
                            >
                                {availableTimes.map(time => (
                                    <option key={time} value={time}>{time}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}

                {selectedDate && selectedTime && (
                    <CinemaHall 
                        movieId={id} 
                        date={selectedDate} 
                        time={selectedTime} 
                    />
                )}
            </div>
            <Footer />
        </>
    );
}

export default Booking;
