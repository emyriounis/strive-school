import Card from "react-bootstrap/Card";
import { Component } from "react";

class SingleBook extends Component {
  state = {
    selected: false,
  };
  render() {
    return (
      <Card
        className={this.state.selected ? "bg-success" : "text-light bg-dark"}
        onClick={() => {
          this.setState({ selected: !this.state.selected });
        }}
      >
        <Card.Img
          variant="top"
          src={this.props.img}
          style={{ height: "500px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title style={{ height: "100px" }}>
            {this.props.title}
          </Card.Title>
        </Card.Body>
      </Card>
    );
  }
}

export default SingleBook;
