import SingleBook from "./SingleBook";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import CommentArea from "./CommentArea";

const BookList = (props) => {
  const [query, setQuery] = useState("");
  const filterBookList = (query) => {
    return props.books.filter((book) => book.title.includes(query));
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

  const [selected, setSelected] = useState(null);
  const [comments, setComments] = useState(null);
  useEffect(() => selected && getComments(selected), [selected]);

  return (
    <Container className="mt-5">
      <Form>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
            }}
          />
        </Form.Group>
      </Form>
      <Row>
        <Col style={{ maxHeight: "100vh", overflowY: "scroll" }}>
          <Row>
            {filterBookList(query).map((book) => (
              <Col
                className="p-3"
                xs={12}
                md={6}
                xl={4}
                onClick={() => setSelected(book.asin)}
              >
                <SingleBook
                  key={book.asin}
                  title={book.title}
                  img={book.img}
                  id={book.asin}
                />
              </Col>
            ))}
          </Row>
        </Col>
        {selected && (
          <Col>
            <CommentArea comments={comments} book={props.id} />
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default BookList;
