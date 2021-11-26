import "../styles/footer.css";
import { Col, Container, Image, Row, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { QuestionCircleFill, GearFill } from "react-bootstrap-icons";

const Footer = () => {
  return (
    <Container
      fluid
      className="px-5 mt-5"
      style={{
        color: "rgba(0,0,0,0.6)",
        maxWidth: "80%",
      }}
    >
      <Row>
        <Image
          src="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Logo.svg.original.svg"
          style={{ width: "84px" }}
        />
      </Row>
      <Row xs={1} lg={2}>
        <Col className="mt-2 mb-3 p-0">
          <Row
            xs={1}
            sm={2}
            md={3}
            style={{
              fontSize: "12px",
              fontWeight: "700",
              lineHeight: "2",
            }}
          >
            <Col>
              <Link className="link" to="/">
                About
              </Link>
            </Col>
            <Col>
              <Link className="link" to="/">
                Accessibility
              </Link>
            </Col>
            <Col>
              <Link className="link" to="/">
                Talent Solutions
              </Link>
            </Col>
            <Col>
              <Link className="link" to="/">
                Community Guidelines
              </Link>
            </Col>
            <Col>
              <Link className="link" to="/">
                Careers
              </Link>
            </Col>
            <Col>
              <Link className="link" to="/">
                Marketing Solutions
              </Link>
            </Col>
            <Col>
              <Link className="link" to="/">
                Privacy &amp; Terms
              </Link>
            </Col>
            <Col>
              <Link className="link" to="/">
                Ad Choices
              </Link>
            </Col>
            <Col>
              <Link className="link" to="/">
                Advertising
              </Link>
            </Col>
            <Col>
              <Link className="link" to="/">
                Sales Solutions
              </Link>
            </Col>
            <Col>
              <Link className="link" to="/">
                Mobile
              </Link>
            </Col>
            <Col>
              <Link className="link" to="/">
                Small Business
              </Link>
            </Col>
            <Col>
              <Link className="link" to="/">
                Safety Center
              </Link>
            </Col>
          </Row>
        </Col>
        <Col className="mt-2 mb-3 p-0">
          <Row xs={1} sm={2}>
            <Col>
              <Row className="px-3">
                <QuestionCircleFill size={24} />
                <Col
                  className="mx-2 mb-3"
                  style={{ fontSize: "12px", lineHeight: "1.5" }}
                >
                  <Row
                    className="link"
                    style={{
                      fontWeight: "700",
                    }}
                  >
                    Questions?
                  </Row>
                  <Row>Visit our Help Center</Row>
                </Col>
              </Row>
              <Row className="px-3">
                <GearFill size={24} />
                <Col className="mx-2 mb-3" style={{ fontSize: "12px" }}>
                  <Row
                    className="link"
                    style={{
                      fontWeight: "700",
                    }}
                  >
                    Manage your account and privacy
                  </Row>
                  <Row>Go to your Settings</Row>
                </Col>
              </Row>
            </Col>
            <Col className="px-3">
              <Row className="m-0" style={{ fontSize: "12px" }}>
                Select Language
              </Row>
              <Row className="m-0">
                <Form.Control as="select" size="sm">
                  <option value="en">English (English)</option>
                  <option value="el">Greek (Ελληνικά)</option>
                </Form.Control>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row style={{ fontSize: "12px" }}>LinkedIn Corporation © 2021</Row>
    </Container>
  );
};

export default Footer;
