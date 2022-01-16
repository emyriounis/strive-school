import { ListGroup } from "react-bootstrap";

const CommentsItems = ({ comments }) => {
  console.log(comments);
  return (
    <>
      <ListGroup>
        {comments.length > 0 &&
          comments.map((review) => (
            <ListGroup.Item key={review.id}>
              {review.comment}, Rated: {review.rate}
            </ListGroup.Item>
          ))}
        <br />
      </ListGroup>
    </>
  );
};

export default CommentsItems;
