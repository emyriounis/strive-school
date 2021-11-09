import { Navbar, Nav } from "react-bootstrap";

const MyNav = () => (
  <Navbar bg="primary" variant="dark">
    <Nav className="mx-4">
      <Nav.Link href="#">Home</Nav.Link>
      <Nav.Link href="#">About</Nav.Link>
      <Nav.Link href="#">Browse</Nav.Link>
    </Nav>
  </Navbar>
);
export default MyNav;
