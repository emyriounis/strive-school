import SingleBook from "./SingleBook";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useState } from "react";

const BookList = (props) => {
  const [query, setQuery] = useState("");
  const filterBookList = (query) => {
    return props.books.filter((book) => book.title.includes(query));
  };

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
        {filterBookList(query).map((book) => (
          <Col key={book.asin} xs={12} md={6} xl={4} className="p-3">
            <SingleBook title={book.title} img={book.img} id={book.asin} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BookList;
