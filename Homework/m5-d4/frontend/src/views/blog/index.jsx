import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author";
import BlogLike from "../../components/likes/BlogLike";
import AddComment from "../../components/blog/blog-add-comment/index";
// import posts from "../../data/posts.json";
import "./styles.css";

const Blog = (props) => {
  const [state, setState] = useState({
    blog: {},
    loading: true,
  });

  const getBlogPosts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/blogPosts/");
      if (!response.ok) {
        throw new Error("Failed to fetch");
      } else {
        const posts = await response.json();
        return posts;
      }
    } catch (error) {
      alert(error);
      return [];
    }
  };

  useEffect(() => {
    const pasok = async () => {
      const { id } = props.match.params;
      const blogPosts = await getBlogPosts();
      console.log(blogPosts);
      const blog = blogPosts.find((post) => post.id.toString() === id);
      if (blog) {
        setState({ blog, loading: false });
      } else {
        props.history.push("/404");
      }
    };
    pasok();
  }, []);

  const { loading, blog } = state;
  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <div className="blog-details-root">
        <Container>
          <Image className="blog-details-cover" src={blog.cover} fluid />
          <h1 className="blog-details-title">{blog.title}</h1>

          <div className="blog-details-container">
            <div className="blog-details-author">
              <BlogAuthor {...blog.author} />
            </div>
            <div className="blog-details-info">
              <div>{blog.createdAt}</div>
              {blog.readTime && (
                <div>{`${blog.readTime.value} ${blog.readTime.unit} read`}</div>
              )}
              <div style={{ marginTop: 20 }}>
                <BlogLike defaultLikes={["123"]} onChange={console.log} />
              </div>
            </div>
          </div>

          <AddComment params={useParams} />

          <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
        </Container>
      </div>
    );
  }
};

export default Blog;
