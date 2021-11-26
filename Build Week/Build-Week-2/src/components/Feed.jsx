import { useState, useEffect } from "react";
import NewPost from "./NewPost";
import SinglePost from "./SinglePost";
import getPosts from "../api/getPosts";
import LeftComponent from "./LeftComponent";
import { Col, Container, Row } from "react-bootstrap";
import RightComponent from "./RightComponent";
import Loading from "./Loading";
import Error from "./Error";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadPosts = async () => {
    try {
      const resp = await getPosts();
      setPosts(resp.slice(-24, -1));
      return resp;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => loadPosts(), []);

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <Container>
      <Row>
        <Col xs={12} lg={6}>
          <NewPost />
          {posts.length > 0 ? (
            posts.map((post) => <SinglePost key={post._id} post={post} />)
          ) : (
            <Loading />
          )}
        </Col>
        <Col xs={12} lg={{ order: "first" }}>
          <LeftComponent />
        </Col>
        <Col xs={12} lg={3}>
          <RightComponent />
        </Col>
      </Row>
    </Container>
  );
};

export default Feed;
