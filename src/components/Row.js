import React, { useState, useEffect } from "react";
import axios from "../axios";

const base_url = "https://image.tmdb.org/t/p/original"

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    // if [] , run once when the roe loads, and dont run again
    const fetchData = async () => {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      console.table(request.data.results);
      return request;
    };

    fetchData();
  }, [fetchUrl]);
  return (
    <div className="row">
      <h3>{title}</h3>
      <div className="row__posters">
        {movies.map(movie => {
          return (
          <div className="movie__container" key={movie.id}>
            <img className="movie__poster" src={`${base_url}${isLargeRow ? movie?.poster_path : movie?.backdrop_path || movie?.poster_path}` } alt={movie.name || movie.title} />
            <p>{movie.name || movie.title }</p>
          </div>
          )
        })}
      </div>
    </div>
  );
}

export default Row;
