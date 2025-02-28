// src/components/Poster.jsx
import { useInView } from 'react-intersection-observer'; // Using react-intersection-observer (Option 3 from previous)
import '../assets/style/Poster.css';
import { motion } from "framer-motion";

const base_url = "https://image.tmdb.org/t/p/original";

export default function Poster({ movie, isLargeRow, onClick }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      className="poster"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      ref={ref}
    >
      {inView && (
        <img
          className="poster__image"
          src={`${base_url}${isLargeRow ? movie?.poster_path : movie?.backdrop_path || movie?.poster_path}`}
          alt={movie?.name || movie?.title}
          loading="lazy"
        />
      )}
      <div className="poster__overlay">
        <span className="poster__text">View Trailer</span>
      </div>
      <p className="poster__title">{movie?.name || movie?.title}</p>
    </motion.div>
  );
}