import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Error from "./components/Error";
import TopNav from "./components/TopNav";
import Player from "./components/Player";
import Home from "./components/Home";
import Album from "./components/Album";
import Artist from "./components/Artist";

const App = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <BrowserRouter>
        <Sidebar show={show} handleClose={handleClose} />
        <TopNav handleShow={handleShow} />
        <Player />
        <Routes>
          <Route path="/" element={<Home handleShow={handleShow} />} />
          <Route
            path="/album/:id"
            element={<Album handleShow={handleShow} />}
          />
          <Route
            path="/artist/:id"
            element={<Artist handleShow={handleShow} />}
          />
          <Route path="*" element={<Error error="Page not found" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
