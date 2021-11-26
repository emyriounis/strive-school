import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import MyNavbar from "./components/MyNavbar";
import Profile from "./components/Profile";
import Error from "./components/Error";
import Feed from "./components/Feed";

const App = () => {
  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="*" element={<Error error="Page not found" />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
