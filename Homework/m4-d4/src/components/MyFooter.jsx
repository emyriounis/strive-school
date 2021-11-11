import { Navbar, Nav } from "react-bootstrap";

const MyFooter = () => (
  <Navbar fixed="bottom" bg="light" variant="light">
    <Nav className="mx-4">
      <Nav.Link href="#">Home</Nav.Link>
      <Nav.Link href="#">About</Nav.Link>
      <Nav.Link href="#">Browse</Nav.Link>
    </Nav>
  </Navbar>
);
export default MyFooter;
