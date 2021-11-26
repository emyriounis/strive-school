import { useState, useEffect } from "react";
import { ListGroup, Badge } from "react-bootstrap";
import Loading from "./Loading";
import Error from "./Error";

const Comments = (props) => {
  const getComments = async (id) => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${id}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTgyOGVjZmFhY2FhMjAwMTU1MmExN2MiLCJpYXQiOjE2MzU5NDYxOTEsImV4cCI6MTYzNzE1NTc5MX0.Nlyj9HHBZ_rBlsOlnyfINlvAPFFeHyVqunKdfoHSoL0",
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("fail to fetch");
      } else {
        const data = await response.json();
        setComments(data);
        return data;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const [comments, setComments] = useState(null);
  useEffect(() => !comments && getComments(props.id));
  useEffect(() => setComments(null), [props]);

  return (
    <ListGroup as="ol" className="mt-4">
      {comments ? (
        comments.map((comment) => (
          <ListGroup.Item
            key={comment._id}
            as="li"
            className="d-flex justify-content-between align-items-center"
          >
            <div className="mx-2">{comment.comment}</div>
            <Badge variant="primary" pill>
              {comment.rate}
            </Badge>
          </ListGroup.Item>
        ))
      ) : (
        <Loading />
      )}
    </ListGroup>
  );
};

export default Comments;
