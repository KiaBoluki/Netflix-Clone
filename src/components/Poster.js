import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
const base_url = "https://image.tmdb.org/t/p/original";

function Poster({movie, isLargeRow, onClick}) {
    return (
        <div className="movie__container" key={movie.id} onClick={onClick}>
          <LazyLoadImage className="movie__poster" src={`${base_url}${isLargeRow ? movie?.poster_path : movie?.backdrop_path || movie?.poster_path}` } alt={movie.name || movie.title} />
        <p>{movie.name || movie.title }</p>
      </div>
    )
}

export default Poster
