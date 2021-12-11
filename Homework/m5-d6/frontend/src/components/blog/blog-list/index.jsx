import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import BlogItem from "../blog-item";

const BlogList = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  const getBlogPosts = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/blogPosts`
      );
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
          <Col key={blogPost.id} md={4} style={{ marginBottom: 50 }}>
            <BlogItem key={blogPost.title} {...blogPost} />
          </Col>
        ))}
    </Row>
  );
};

export default BlogList;
