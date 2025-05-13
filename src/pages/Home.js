import React from "react";
import MovieList from "../components/MovieList";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Home.css";

function Home({movies}) {
    return (
        <>
            <Header />
            <div className="home-container">
                <MovieList movies={movies} />
            </div>
            <Footer />
        </>
    )
};

export default Home;
