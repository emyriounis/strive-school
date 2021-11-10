import Card from "react-bootstrap/Card";

const SingleBook = (props) => (
  <Card>
    <Card.Img variant="top" src={props.img} />
    <Card.Body>
      <Card.Title>{props.title}</Card.Title>
    </Card.Body>
  </Card>
);
export default SingleBook;
