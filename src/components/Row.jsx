// src/components/Row.jsx
import { useState, useEffect } from "react";
import axios from "../axios";
import Poster from "./Poster";
import Modal from "./Modal";
import movieTrailer from "movie-trailer";
import "../assets/style/Row.css";
import { motion } from "framer-motion";

export default function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = async (movie) => {
    try {
      const url = await movieTrailer(movie?.title || movie?.name);
      if (url) {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get('v'));
        setIsModalOpen(true);
      } else {
        setTrailerUrl("");
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
      setTrailerUrl("");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTrailerUrl("");
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <motion.section
      className="row"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="row__title">{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <Poster
            key={movie.id}
            movie={movie}
            isLargeRow={isLargeRow}
            onClick={() => handleClick(movie)}
          />
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} videoId={trailerUrl} />
    </motion.section>
  );
}