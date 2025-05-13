import React, { useState } from 'react';
import '../styles/CinemaHall.css';

function CinemaHall() {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const rows = 8;
  const cols = 10;

  const rowLabels = Array.from({ length: rows }, (_, i) => String.fromCharCode(65 + i));

  const handleSeatClick = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
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

        rowSeats.push(
          <div 
            key={seatId}
            className={`seat ${isSelected ? 'selected' : ''}`}
            onClick={() => handleSeatClick(seatId)}
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
      </div>

      <div className="seats-container">
        <div className="seats-grid">
          {renderSeats()}
        </div>
      </div>

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
        >
          Book Tickets
        </button>
      </div>
    </div>
  );
}

export default CinemaHall;
