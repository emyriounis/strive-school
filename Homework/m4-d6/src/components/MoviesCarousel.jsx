// import movies from "../data/movies"
import { useEffect, useState } from "react";
import { movies } from "../data/movies";
import Carousel from "react-bootstrap/Carousel";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import SingleMovie from "./SingleMovie";
import "../componentStyles/MoviesCarousel.css";
import Error from "./Error";
import Loading from "./Loading";
import Comments from "./Comments";

const MoviesCarousel = ({ galleryTitle, query }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [moviesJson, setMoviesJson] = useState({});
  const [comment, setComment] = useState(null);

  const getMovies = async () => {
    if (loading) {
      try {
        const resp = await movies(query);
        setMoviesJson(resp);
        return resp;
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => setLoading(true), [query]);
  useEffect(() => getMovies());

  if (error) return <Error error={error} />;
  return (
    <>
      <Container className="my-4">
        <h4 className="text-white mb-3">{galleryTitle}</h4>
        {comment && <Comments id={comment} />}
        {loading ? (
          <Loading />
        ) : (
          <Carousel>
            <Carousel.Item>
              <Row>
                {moviesJson.Search &&
                  moviesJson.Search.slice(0, 6).map((m) => (
                    <SingleMovie
                      key={m.imdbID}
                      movieObj={m}
                      handleComments={(id) => setComment(id)}
                    />
                  ))}
              </Row>
            </Carousel.Item>
            <Carousel.Item>
              <Row>
                {moviesJson.Search &&
                  moviesJson.Search.slice(6, 12).map((m) => (
                    // onClick={() => setComment(m.imdbID)}
                    <SingleMovie
                      key={m.imdbID}
                      movieObj={m}
                      handleComments={(id) => setComment(id)}
                    />
                  ))}
              </Row>
            </Carousel.Item>
          </Carousel>
        )}
      </Container>
    </>
  );
};

export default MoviesCarousel;
