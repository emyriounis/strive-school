import Card from "react-bootstrap/Card";

const SingleBook = (props) => {
  return (
    <Card className="text-light bg-dark">
      <Card.Img
        variant="top"
        src={props.img}
        style={{ height: "500px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title style={{ height: "100px" }}>{props.title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default SingleBook;
