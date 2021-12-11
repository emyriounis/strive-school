import { useState } from "react";
import { Navbar, Container, Nav, Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import Error from "./Error";

const NavBar = () => {
  const [show, setShow] = useState(false);
  const [file, setFile] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const uploadFile = async () => {
    try {
      setLoading(true);
      const fileData = new FormData();
      fileData.append("file", file);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/files`, {
        method: "POST",
        body: fileData,
        onUploadProgress: (p) => {
          console.log(p);
          // this.setState({
          //   fileprogress: p.loaded / p.total,
          // });
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch");
      } else {
        const profileImage = await response.json();
        handleClose();
        return profileImage;
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Navbar bg="light" variant="light">
      <Container fluid>
        <Nav className="me-auto py-0">
          <Nav.Link>
            <Link className="nav-link" to="/">
              Home
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link className="nav-link" to="/starred">
              Starred
            </Link>
          </Nav.Link>
        </Nav>
        <Button variant="dark" onClick={handleShow}>
          Upload
        </Button>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload your GIF</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <Loading />
          ) : error ? (
            <Error />
          ) : (
            <Form.Group className="mb-3">
              <Form.Control
                type="file"
                onChange={(event) => setFile(event.target.files[0])}
              />
            </Form.Group>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={uploadFile}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
};

export default NavBar;
