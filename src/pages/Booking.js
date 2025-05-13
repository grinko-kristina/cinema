import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CinemaHall from "../components/CinemaHall";
import { useParams } from "react-router-dom";
import "../styles/Booking.css";

function Booking() {
    const { id } = useParams();

    return (
        <>
            <Header />
            <div className="booking-container">
                <h1>Book Your Tickets</h1>
                <p>Movie ID: {id}</p>
                <CinemaHall />
            </div>
            <Footer />
        </>
    );
}

export default Booking;
