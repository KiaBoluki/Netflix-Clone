// src/components/Banner.jsx
import { useState, useEffect } from "react";
import axios from "../axios";
import { requests } from "../requests";
import Navbar from "./Navbar";
import "../assets/style/Banner.css";
import { motion } from "framer-motion";

export default function Banner() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);
        const randomIndex = Math.floor(Math.random() * request.data.results.length);
        setMovie(request.data.results[randomIndex]);
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <motion.header
      className="banner"
      style={{
        backgroundImage: movie?.backdrop_path
          ? `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`
          : "none",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Navbar />
      <div className="banner__content">
        <motion.h1
          className="banner__title"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {movie?.name || movie?.title || movie?.original_name}
        </motion.h1>
        <motion.p
          className="banner__description"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          {movie?.overview}
        </motion.p>
        <motion.div
          className="banner__buttons"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <button className="banner__button banner__button--play">Play</button>
          <button className="banner__button banner__button--info">More Info</button>
        </motion.div>
      </div>
      <div className="banner__gradient" />
    </motion.header>
  );
}