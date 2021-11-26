import { useState } from "react";
import { ListGroup, Badge, Button } from "react-bootstrap";
import Loading from "./Loading";
import Error from "./Error";

const CommentsList = (props) => {
  const deleteComment = async (id) => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${id}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTgyOGVjZmFhY2FhMjAwMTU1MmExN2MiLCJpYXQiOjE2MzcyNDAyMTYsImV4cCI6MTYzODQ0OTgxNn0.a4XNp_r6Hz4XU3DkzppOSBlpB_qcTJHnjW-lc5yYoWc",
            "Content-Type": "application/json",
          },
          method: "DELETE",
        }
      );
      if (!response.ok) {
        setError("fail to fetch");
        throw new Error("fail to fetch");
      } else {
        const data = await response.json();
        console.log(data);
        return data;
      }
    } catch (error) {
      setError(error);
      throw new Error(error);
    }
  };

  const [error, setError] = useState(false);

  return (
    <>
      {error ? (
        <Error />
      ) : (
        <ListGroup as="ol" className="mt-4">
          {props.comments ? (
            props.comments.map((comment) => (
              <ListGroup.Item
                key={comment._id}
                as="li"
                className="d-flex justify-content-between align-items-center"
              >
                <div className="mx-2">{comment.comment}</div>
                <Badge variant="primary" pill>
                  {comment.rate}
                </Badge>
                <Button
                  variant="outline-danger"
                  className="ms-auto"
                  onClick={() => deleteComment(comment._id)}
                >
                  Delete
                </Button>
              </ListGroup.Item>
            ))
          ) : (
            <Loading />
          )}
        </ListGroup>
      )}
    </>
  );
};

export default CommentsList;
