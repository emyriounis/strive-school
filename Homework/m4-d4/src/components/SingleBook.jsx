import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import CommentArea from "./CommentArea";

const SingleBook = (props) => {
  const books = async () => {
    const response = await fetch(
      "https://s3.eu-west-1.amazonaws.com/eduflow-production/activity-resources/492286025160926.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2TAWW44RCEE6YREN%2F20211109%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20211109T154325Z&X-Amz-Expires=600&X-Amz-SignedHeaders=host&response-content-disposition=inline%3B%20filename%2A%3DUTF-8%27%27history.json&X-Amz-Signature=2ad8d420d2f9f7983ad0a5d7b5fe5da55b21561af3a8a7c57fead61a29a72136"
    );
    const books = await response.json();
    setData(books);
    return books;
  };

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

  const [data, setData] = useState(null);
  const [comments, setComments] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => !data && books());
  useEffect(() => selected && !comments && getComments(props.id));

  return (
    <>
      <Card
        className={selected ? "bg-success" : "text-light bg-dark"}
        onClick={() => {
          setSelected(!selected);
        }}
      >
        <Card.Img
          variant="top"
          src={props.img}
          style={{ height: "500px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title style={{ height: "100px" }}>{props.title}</Card.Title>
        </Card.Body>
      </Card>
      {selected && <CommentArea comments={comments} book={props.id} />}
    </>
  );
};

export default SingleBook;
