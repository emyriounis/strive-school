import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useState } from "react";

const AddComment = (props) => {
  const [data, setData] = useState({
    comment: "",
    rate: null,
  });

  const [msg, setMsg] = useState(false);

  const submitComment = async () => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTgyOGVjZmFhY2FhMjAwMTU1MmExN2MiLCJpYXQiOjE2MzcyNDAyMTYsImV4cCI6MTYzODQ0OTgxNn0.a4XNp_r6Hz4XU3DkzppOSBlpB_qcTJHnjW-lc5yYoWc",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            comment: data.comment,
            rate: data.rate,
            elementId: props.id,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("fail to fetch");
      } else {
        const data = await response.json();
        setMsg(true);
        setTimeout(() => setMsg(false), 3000);
        return data;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <Form className="mt-4">
      {msg && <Alert variant="success">Comment uplaoded successfully</Alert>}
      <Form.Group className="mb-3" controlId="comment">
        <Form.Label>Comment</Form.Label>
        <Form.Control
          type="text"
          label={data.comment}
          placeholder="Tell us your opinion"
          required
          onChange={(event) =>
            setData({ ...data, comment: event.target.value })
          }
        />
      </Form.Group>

      <Form.Group as={Row} className="mb-3" required>
        <Form.Label as="legend" column sm={2}>
          Rate
        </Form.Label>
        <Col sm={10}>
          <Form.Check
            type="radio"
            label="1"
            name="formHorizontalRadios"
            id={"formHorizontalRadios1" + props.id}
            onClick={(event) => setData({ ...data, rate: 1 })}
          />
          <Form.Check
            type="radio"
            label="2"
            name="formHorizontalRadios"
            id={"formHorizontalRadios2" + props.id}
            onClick={(event) => setData({ ...data, rate: 2 })}
          />
          <Form.Check
            type="radio"
            label="3"
            name="formHorizontalRadios"
            id={"formHorizontalRadio3" + props.id}
            onClick={(event) => setData({ ...data, rate: 3 })}
          />
          <Form.Check
            type="radio"
            label="4"
            name="formHorizontalRadios"
            id={"formHorizontalRadios4" + props.id}
            onClick={(event) => setData({ ...data, rate: 4 })}
          />
          <Form.Check
            type="radio"
            label="5"
            name="formHorizontalRadios"
            id={"formHorizontalRadios5" + props.id}
            onClick={(event) => setData({ ...data, rate: 5 })}
          />
        </Col>
      </Form.Group>
      <Button variant="primary" type="button" onClick={submitComment}>
        Submit
      </Button>
    </Form>
  );
};

export default AddComment;
