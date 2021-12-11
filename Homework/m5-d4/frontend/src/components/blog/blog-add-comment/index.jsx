import { Form, FormControl, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";

const AddComment = (props) => {
  const [comment, setComment] = useState("");

  const uploadComment = async () => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/posts/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ id: props.params().id, comment: comment }),
        }
      );
      console.log(response);
      if (response.ok) {
        const postedComment = await response.json();
        return postedComment;
      } else {
        throw new Error("Fetch error!");
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  useEffect(() => {
    setComment("");
  }, []);

  return (
    <Form className="d-flex mt-3" onSubmit={() => uploadComment()}>
      <FormControl
        type="text"
        placeholder="Comment..."
        className="me-2"
        value={comment}
        onChange={(event) => setComment(event.target.value)}
      />
      <Button type="submit" variant="outline-success">
        Submit
      </Button>
    </Form>
  );
};

export default AddComment;
