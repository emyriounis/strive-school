import { useParams } from "react-router";
import { useState } from "react";
import { useEffect } from "react";
import Loading from "./Loading";
import Error from "./Error";

const MovieDetails = () => {
  const params = useParams();

  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getMovie = async () => {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${params.id}`
      );
      if (!response.ok) {
        setError("Failed to fetch");
        throw new Error("Failed to fetch");
      } else {
        const movie = await response.json();
        if (movie.Error) {
          setError(movie.Error);
        } else {
          setMovie(movie);
          return movie;
        }
      }
    } catch (error) {
      setError(error);
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => getMovie(), []);

  return (
    <div className="text-white m-5">
      {loading ? (
        <Loading />
      ) : error ? (
        <Error error={error} />
      ) : (
        <>
          <h2>Movie Details:</h2>
          <ul>
            <li>Title: {movie.Title}</li>
            <li>Year: {movie.Year}</li>
            <li>Rated: {movie.Rated}</li>
            <li>Released: {movie.Released}</li>
            <li>Runtime: {movie.Runtime}</li>
            <li>Genre: {movie.Genre}</li>
            <li>Director: {movie.Director}</li>
            <li>Writer: {movie.Writer}</li>
            <li>Actors: {movie.Actors}</li>
            <li>Plot: {movie.Plot}</li>
            <li>Language: {movie.Language}</li>
            <li>Country: {movie.Country}</li>
            <li>Awards: {movie.Awards}</li>
            <li>
              Poster:{" "}
              <img src={movie.Poster} alt="Poster" width="45px" height="80px" />
            </li>
            <li>
              Ratings:
              {movie.Ratings.map((rating) => (
                <ul>
                  <li>
                    Source: {rating.Source}
                    <br />
                    Value: {rating.Value}
                  </li>
                </ul>
              ))}
            </li>
            <li>Metascore: {movie.Metascore}</li>
            <li>imdbRating: {movie.imdbRating}</li>
            <li>imdbVotes: {movie.imdbVotes}</li>
            <li>imdbID: {movie.imdbID}</li>
            <li>Type: {movie.Type}</li>
            <li>DVD: {movie.DVD}</li>
            <li>BoxOffice: {movie.BoxOffice}</li>
            <li>Production: {movie.Production}</li>
            <li>Website: {movie.Website}</li>
          </ul>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
