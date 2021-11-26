import "bootstrap/dist/css/bootstrap.min.css";
import MoviesCarousel from "./components/MoviesCarousel";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Form, FormControl } from "react-bootstrap";
import { useState } from "react";

const App = () => {
  const [query, setQuery] = useState("");
  return (
    <>
      <Navbar />
      <Form className="d-flex mr-3 w-100">
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Form>
      {query && <MoviesCarousel galleryTitle="Search" query={query} />}
      <MoviesCarousel galleryTitle="Action" query="mission impossible" />
      <MoviesCarousel galleryTitle="Fantasy" query="harry" />
      <MoviesCarousel galleryTitle="Drama" query="game of thrones" />
      <Footer />
    </>
  );
};

export default App;
