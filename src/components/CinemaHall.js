import React, { useState, useEffect } from 'react';
import '../styles/CinemaHall.css';
import bookingService from '../services/BookingService';

function CinemaHall({ movieId, date, time }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState("");

  const rows = 8;
  const cols = 10;

  const rowLabels = Array.from({ length: rows }, (_, i) => String.fromCharCode(65 + i));

  useEffect(() => {
    if (movieId && date && time) {
      const booked = bookingService.getBookedSeats(movieId, date, time);
      setBookedSeats(booked);
    }
  }, [movieId, date, time]);

  useEffect(() => {
    setSelectedSeats([]);
    setBookingSuccess(false);
    setBookingError("");
  }, [movieId, date, time]);

  const handleSeatClick = (seatId) => {
    if (bookedSeats.includes(seatId)) {
      return;
    }

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleBooking = () => {
    if (selectedSeats.length === 0) {
      return;
    }

    try {
      const success = bookingService.saveBooking(movieId, date, time, selectedSeats);

      if (success) {
        setBookingSuccess(true);
        setBookedSeats([...bookedSeats, ...selectedSeats]);
        setSelectedSeats([]);
      } else {
        setBookingError("Failed to save booking. Please try again.");
      }
    } catch (error) {
      setBookingError("An error occurred while saving your booking.");
      console.error("Booking error:", error);
    }
  };

  const seatPrice = 120;
  const totalPrice = selectedSeats.length * seatPrice;

  const renderSeats = () => {
    const seatRows = [];

    for (let i = 0; i < rows; i++) {
      const row = rowLabels[i];
      const rowSeats = [];

      rowSeats.push(
        <div key={`label-${row}`} className="row-label">
          {row}
        </div>
      );

      for (let j = 0; j < cols; j++) {
        const seatId = `${row}${j + 1}`;
        const isSelected = selectedSeats.includes(seatId);
        const isBooked = bookedSeats.includes(seatId);

        rowSeats.push(
          <div 
            key={seatId}
            className={`seat ${isSelected ? 'selected' : ''} ${isBooked ? 'booked' : ''}`}
            onClick={() => handleSeatClick(seatId)}
            title={isBooked ? "This seat is already booked" : ""}
          >
            <div className="seat-number">{j + 1}</div>
          </div>
        );
      }

      seatRows.push(
        <div key={`row-${row}`} className="seat-row">
          {rowSeats}
        </div>
      );
    }

    return seatRows;
  };

  return (
    <div className="cinema-hall-container">
      <div className="screen">SCREEN</div>

      <div className="seat-legend">
        <div className="legend-item">
          <div className="legend-color legend-available"></div>
          <span>Available</span>
        </div>
        <div className="legend-item">
          <div className="legend-color legend-selected"></div>
          <span>Selected</span>
        </div>
        <div className="legend-item">
          <div className="legend-color legend-booked"></div>
          <span>Booked</span>
        </div>
      </div>

      <div className="seats-container">
        <div className="seats-grid">
          {renderSeats()}
        </div>
      </div>

      {bookingSuccess && (
        <div className="booking-success">
          <p>Your booking has been confirmed! Thank you for your purchase.</p>
        </div>
      )}

      {bookingError && (
        <div className="booking-error">
          <p>{bookingError}</p>
        </div>
      )}

      <div className="selected-seats">
        <h3>Selected Seats</h3>
        {selectedSeats.length > 0 ? (
          <div className="selected-seats-list">
            {selectedSeats.map(seat => (
              <div key={seat} className="selected-seat-item">
                {seat}
              </div>
            ))}
          </div>
        ) : (
          <p>No seats selected</p>
        )}
      </div>

      <div className="booking-info">
        <div className="total-price">
          Total: ₴{totalPrice}
        </div>
        <button 
          className="book-button"
          disabled={selectedSeats.length === 0}
          onClick={handleBooking}
        >
          Book Tickets
        </button>
      </div>
    </div>
  );
}

export default CinemaHall;
