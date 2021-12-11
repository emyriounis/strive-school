import { useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import MoviesCarousel from "./MoviesCarousel";

const TVShows = () => {
  const [query, setQuery] = useState("");
  return (
    <>
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
    </>
  );
};

export default TVShows;
