import React, { useState, useEffect } from "react";
import axios from "../axios";
import Poster from "./Poster";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const opts ={
    width: "100%",
    height: "390px",
    playerVars: {
      autoplay: 1
    }
  }
  const clickHandler = (e, movie) => {
    if(trailerUrl){
      setTrailerUrl("");
    }else{

      movieTrailer(movie?.title || movie?.name) 
      .then(url => {
        if( !url ) return;
        const urlParams = new URLSearchParams ( new URL(url).search);
        setTrailerUrl(urlParams.get('v'));
      })
    }
  }
  useEffect(() => {
    // if [] , run once when the roe loads, and dont run again
    const fetchData = async () => {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      //console.table(request.data.results);
      return request;
    };

    fetchData();
  }, [fetchUrl]);
  return (
    <div className="row">
      <h3>{title}</h3>
      <div className="row__posters">
        {movies.map((movie) => {
          return <Poster movie={movie} isLargeRow={isLargeRow} onClick={(e)=>clickHandler(e,movie)} key={movie.id}/>;
        })}
      </div>
      {trailerUrl && <YouTube key={trailerUrl} opts={opts} videoId={trailerUrl} />}
    </div>
  );
}

export default Row;
