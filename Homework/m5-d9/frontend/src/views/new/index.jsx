import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Container, Form, Button } from "react-bootstrap";
import "./styles.css";

const NewBlogPost = () => {
  const [state, setState] = useState({
    title: "",
    author: "",
    category: "",
    text: "",
  });
  const [formData, setFormData] = useState({});
  // console.log(formData);

  const handleChange = (value) => {
    setState({ ...state, text: value });
  };

  const handleForm = (item, value) => {
    const newState = { ...state };
    newState[item] = value;
    setState(newState);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8080/blogPosts/", {
        method: "POST",
        body: JSON.stringify(state),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch");
      } else {
        const newBlogPost = await response.json();
        await uploadCover(newBlogPost.id);
        return newBlogPost;
      }
    } catch (error) {
      alert(error);
    }
  };

  const uploadCover = async (id) => {
    try {
      const cover = new FormData();
      cover.append("blogCover", formData);
      // console.log(cover);

      const response = await fetch(
        `http://127.0.0.1:8080/files/blogPosts/${id}/uploadCover`,
        {
          method: "POST",
          body: cover,
        }
      );
      // console.log(response);
      if (!response.ok) {
        throw new Error("Failed to fetch");
      } else {
        const cover2 = await response.json();
        return cover2;
      }
    } catch (error) {
      alert(error);
      // console.log(error);
    }
  };

  return (
    <Container className="new-blog-container">
      <Form className="mt-5" onSubmit={handleSubmit}>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Title"
            value={state.title}
            onChange={(event) => handleForm("title", event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Author</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Author"
            value={state.author}
            onChange={(event) => handleForm("author", event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            size="lg"
            as="select"
            value={state.category}
            onChange={(event) => handleForm("category", event.target.value)}
          >
            <option>Category1</option>
            <option>Category2</option>
            <option>Category3</option>
            <option>Category4</option>
            <option>Category5</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formFile" className="d-flex flex-column my-3 ">
          <Form.Label>Cover</Form.Label>
          <Form.Control
            type="file"
            onChange={(event) => {
              setFormData(event.target.files[0]);
            }}
          />
        </Form.Group>
        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Blog Content</Form.Label>
          <ReactQuill
            value={state.text}
            onChange={handleChange}
            className="new-blog-content"
          />
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{ marginLeft: "1em" }}
          >
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;
