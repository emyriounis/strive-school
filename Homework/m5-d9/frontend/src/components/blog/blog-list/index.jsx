import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import BlogItem from "../blog-item";

const BlogList = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  const getBlogPosts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/blogPosts/");
      if (!response.ok) {
        throw new Error("Failed to fetch");
      } else {
        const posts = await response.json();
        setBlogPosts(posts);
        return posts;
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => getBlogPosts(), []);

  return (
    <Row>
      {blogPosts.length > 0 &&
        blogPosts.map((blogPost) => (
          <Col md={4} style={{ marginBottom: 50 }}>
            <BlogItem key={blogPost.title} {...blogPost} />
          </Col>
        ))}
    </Row>
  );
};

export default BlogList;
