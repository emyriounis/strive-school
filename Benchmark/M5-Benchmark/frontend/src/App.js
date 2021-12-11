import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import TVShows from "./components/TVShows";
import Error from "./components/Error";
import MovieDetails from "./components/MovieDetails";
import NewMedia from "./components/NewMedia";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/tv-shows" element={<TVShows />} />
          <Route path="/:id" element={<MovieDetails />} />
          <Route path="/new" element={<NewMedia />} />
          <Route path="*" element={<Error error="Page not found" />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
