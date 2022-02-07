import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Company from "./components/Company";
import NotFound from "./components/NotFound";
import Favorites from "./components/Favorites";
import { Container, Nav, Navbar } from "react-bootstrap";

const App = () => {
  return (
    <Router>
      <Navbar bg="light" variant="light">
        <Container fluid>
          <Nav>
            <Nav.Link>
              <Link to="/">Home</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/favorites">Favorites</Link>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/:company" element={<Company />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
