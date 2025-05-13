class BookingService {
    saveBooking(movieId, date, time, seats) {
        try {
            const bookings = this.getAllBookings();
            const sessionKey = `${movieId}_${date}_${time}`;

            if (!bookings[sessionKey]) {
                bookings[sessionKey] = [];
            }

            bookings[sessionKey] = [...bookings[sessionKey], ...seats];
            localStorage.setItem('cinemaBookings', JSON.stringify(bookings));

            return true;
        } catch (error) {
            console.error('Error saving booking:', error);
            return false;
        }
    }

    getAllBookings() {
        const bookingsJson = localStorage.getItem('cinemaBookings');
        return bookingsJson ? JSON.parse(bookingsJson) : {};
    }

    getBookedSeats(movieId, date, time) {
        const bookings = this.getAllBookings();
        const sessionKey = `${movieId}_${date}_${time}`;

        return bookings[sessionKey] || [];
    }

    isSeatBooked(movieId, date, time, seatId) {
        const bookedSeats = this.getBookedSeats(movieId, date, time);
        return bookedSeats.includes(seatId);
    }

    clearAllBookings() {
        localStorage.removeItem('cinemaBookings');
    }
}

const bookingService = new BookingService();

export default bookingService;
