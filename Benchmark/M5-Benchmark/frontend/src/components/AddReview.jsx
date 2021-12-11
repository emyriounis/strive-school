import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Error from "./Error";
import Loading from "./Loading";

const AddReview = ({ mediaID }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [review, setReview] = useState({
    comment: "",
    rate: null,
  });
  console.log(mediaID);

  const addReview = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/media/${mediaID}/reviews/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(review),
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
  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  return (
    <Form className="d-flex">
      <Form.Group className="mb-3">
        <Form.Label>Review</Form.Label>
        <Form.Control
          type="text"
          placeholder="Review"
          value={review.comment}
          onChange={(event) =>
            setReview({ ...review, comment: event.target.value })
          }
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Rate (0-5)</Form.Label>
        <Form.Control
          type="text"
          placeholder="Rate"
          value={review.rate}
          onChange={(event) =>
            setReview({ ...review, rate: event.target.value })
          }
        />
      </Form.Group>
      <Button variant="success" onClick={addReview}>
        Add Review
      </Button>
    </Form>
  );
};

export default AddReview;
