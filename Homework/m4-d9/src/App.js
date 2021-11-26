import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookList from "./components/BookList";
import Loading from "./components/Loading";
import Registration from "./components/Registration";
import Error from "./components/Error";

const App = () => {
  const books = async () => {
    const response = await fetch(
      "https://s3.eu-west-1.amazonaws.com/eduflow-production/activity-resources/492286025160926.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2TAWW44RCEE6YREN%2F20211118%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20211118T132127Z&X-Amz-Expires=600&X-Amz-SignedHeaders=host&response-content-disposition=inline%3B%20filename%2A%3DUTF-8%27%27history.json&X-Amz-Signature=f6963928f9d52d7c659fbfd54be5b5f7b27220d1f73afd9e25b2825f8996a521"
    );
    const books = await response.json();
    setData(books);
    return books;
  };

  const [data, setData] = useState(null);
  useEffect(() => books(), []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={data ? <BookList books={data} /> : <Loading />}
        />
        <Route path="/register" element={<Registration />} />
        <Route path="*" element={<Error error="page not found" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
