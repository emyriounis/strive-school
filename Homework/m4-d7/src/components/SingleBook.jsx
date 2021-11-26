import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";

const SingleBook = (props) => {
  const books = async () => {
    const response = await fetch(
      "https://s3.eu-west-1.amazonaws.com/eduflow-production/activity-resources/492286025160926.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2TAWW44RCEE6YREN%2F20211109%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20211109T154325Z&X-Amz-Expires=600&X-Amz-SignedHeaders=host&response-content-disposition=inline%3B%20filename%2A%3DUTF-8%27%27history.json&X-Amz-Signature=2ad8d420d2f9f7983ad0a5d7b5fe5da55b21561af3a8a7c57fead61a29a72136"
    );
    const books = await response.json();
    setData(books);
    return books;
  };

  const [data, setData] = useState(null);

  useEffect(() => !data && books());

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
