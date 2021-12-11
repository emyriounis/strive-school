import { useParams } from "react-router";
import { useState } from "react";
import { useEffect } from "react";
import Loading from "./Loading";
import Error from "./Error";
import { movie as movieFetch } from "../data/movie.js";
import { Button, Form } from "react-bootstrap";
import AddReview from "./AddReview";

const MovieDetails = () => {
  const params = useParams();

  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);

  const getMovie = async () => {
    try {
      const response = await movieFetch(params.id);
      setMovie(response);
      return response;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  // console.log(movie);

  const updateMedia = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/media/${params.id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PATCH",
          body: JSON.stringify(movie),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch");
      } else {
        const newMedia = await response.json();
        if (!file) {
          return newMedia;
        } else {
          const newPoster = await updatePoster(newMedia.id);
          return newPoster;
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updatePoster = async (id) => {
    try {
      setLoading(true);
      const fileData = new FormData();
      fileData.append("poster", file);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/media/${id}/poster`,
        {
          method: "POST",
          body: fileData,
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to fetch");
      } else {
        const poster = await response.json();
        return poster;
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteMedia = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/media/${params.id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async (reviewID) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/media/${params.id}/reviews/${reviewID}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
    } catch (error) {
      setError(error.message);
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
          <Form className="text-light px-5" onSubmit={() => false}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={movie.title}
                onChange={(event) =>
                  setMovie({
                    ...movie,
                    title: event.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter year"
                value={movie.year}
                onChange={(event) =>
                  setMovie({ ...movie, year: event.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>imdbID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={movie.imdbID}
                onChange={(event) =>
                  setMovie({
                    ...movie,
                    imdbID: event.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter type"
                value={movie.type}
                onChange={(event) =>
                  setMovie({ ...movie, type: event.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Poster</Form.Label>
              <img src={movie.poster} alt="Poster" width="45px" />
              <Form.Control
                type="file"
                onChange={(event) => setFile(event.target.files[0])}
              />
            </Form.Group>
          </Form>
          <ul>
            <li>
              Reviews:
              {movie.reviews.map((review) => (
                <ul>
                  <li>Comment: {review.comment}</li>
                  <li>Rate: {review.rate}</li>
                  <Button
                    variant="danger"
                    onClick={() => deleteReview(review.id)}
                  >
                    Delete Review
                  </Button>
                </ul>
              ))}
              <AddReview mediaID={params.id} />
            </li>
          </ul>
          <Button
            className="mb-3"
            variant="primary"
            type="button"
            onClick={updateMedia}
          >
            Update Media
          </Button>
          <Button variant="danger" onClick={deleteMedia}>
            Delete Media
          </Button>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
