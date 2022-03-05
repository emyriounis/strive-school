import { Col, Container, Row } from "react-bootstrap";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar";

const LoggedIn = () => (
  <Container fluid className="px-0">
    <Row className="mx-0">
      <Col className="px-0" xs={4}>
        <Sidebar />
      </Col>
      <Col className="px-0" xs={8}>
        <Main />
      </Col>
    </Row>
  </Container>
);

export default LoggedIn;
