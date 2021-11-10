import SingleBook from "./SingleBook";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Component } from "react";

class BookList extends Component {
  state = {
    query: "",
  };
  filterBookList(query) {
    return this.props.books.filter((book) => book.title.includes(query));
  }
  render() {
    return (
      <Container>
        <Form>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Search..."
              value={this.state.query}
              onChange={(event) => {
                this.setState({ query: event.target.value });
              }}
            />
          </Form.Group>
        </Form>
        <Row>
          {this.filterBookList(this.state.query).map((book) => (
            <Col key={book.asin} xs={12} md={6} xl={4} className="p-3">
              <SingleBook title={book.title} img={book.img} />
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default BookList;
