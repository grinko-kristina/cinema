import React, { useState, useEffect } from 'react';
import '../styles/CinemaHall.css';
import bookingService from '../services/BookingService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CinemaHall({ movieId, date, time }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const rows = 8;
  const cols = 10;

  const rowLabels = Array.from({ length: rows }, (_, i) => String.fromCharCode(65 + i));

  useEffect(() => {
    if (movieId && date && time) {
      console.log(bookingService);
      const booked = bookingService.getBookedSeats(movieId, date, time);
      setBookedSeats(booked);
    }
  }, [movieId, date, time]);

  useEffect(() => {
    setSelectedSeats([]);
    setBookingSuccess(false);
    setBookingError("");
    setShowForm(false);
    setFormData({
      name: '',
      phone: '',
      email: ''
    });
    setFormErrors({
      name: '',
      phone: '',
      email: ''
    });
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

    // Save selected seats to localStorage temporarily
    localStorage.setItem('tempSelectedSeats', JSON.stringify(selectedSeats));

    // Show the booking form
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: '', phone: '', email: '' };

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    // Validate phone
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      valid = false;
    } else if (!/^\d{10,12}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
      valid = false;
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }

    setFormErrors(newErrors);
    return valid;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Get selected seats from localStorage
        const seatsToBook = JSON.parse(localStorage.getItem('tempSelectedSeats')) || selectedSeats;

        const success = bookingService.saveBooking(movieId, date, time, seatsToBook);

        if (success) {
          // Show success toast
          toast.success('Booking confirmed! Thank you for your purchase.');

          setBookingSuccess(true);
          setBookedSeats([...bookedSeats, ...seatsToBook]);
          setSelectedSeats([]);
          setShowForm(false);

          // Clear temporary storage
          localStorage.removeItem('tempSelectedSeats');
        } else {
          toast.error('Failed to save booking. Please try again.');
          setBookingError("Failed to save booking. Please try again.");
        }
      } catch (error) {
        toast.error('An error occurred while saving your booking.');
        setBookingError("An error occurred while saving your booking.");
        console.error("Booking error:", error);
      }
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    // Clear temporary storage
    localStorage.removeItem('tempSelectedSeats');
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
      <ToastContainer position="top-center" autoClose={5000} />

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

      {showForm && (
        <div className="booking-form-overlay">
          <div className="booking-form-container">
            <h2>Complete Your Booking</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                />
                {formErrors.name && <div className="form-error">{formErrors.name}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                />
                {formErrors.phone && <div className="form-error">{formErrors.phone}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                />
                {formErrors.email && <div className="form-error">{formErrors.email}</div>}
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={handleCancelForm}>
                  Cancel
                </button>
                <button type="submit" className="submit-button">
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CinemaHall;
