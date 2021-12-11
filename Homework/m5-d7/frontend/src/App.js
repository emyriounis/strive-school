import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Error from "./components/Error";
import Home from "./components/Home";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/starred" element={<Home filter={true} />} />
        <Route path="*" element={<Error error="Page not found" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
