import { useEffect, useState } from "react";
import SingleComment from "./SingleComment";
import { Row, Col } from "react-bootstrap";

const CommentList = (props) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setComments(props.comments);
  }, []);
  console.log(comments);

  return (
    <Row className="py-3 mt-0 ">
      {comments &&
        comments
          .map((c) => (
            <Col className="my-2" xs="12" key={c._id}>
              <SingleComment comment={c} />
            </Col>
          ))
          .reverse()}
    </Row>
  );
};

export default CommentList;
