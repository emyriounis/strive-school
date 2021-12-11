import "./App.css";
import Edit from "./Components/Backoffice/Form";
import "bootstrap/dist/css/bootstrap.css";
import Homepage from "./Components/Homepage/Homepage";
import SingleProductPage from "./Components/Products/SingleProductPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route
          path="/single-product/:id"
          exact
          element={<SingleProductPage />}
        ></Route>
        <Route
          path="/single-product/:id/back-office"
          exact
          element={<Edit />}
        ></Route>
        <Route path="/new" exact element={<Edit newProduct={true} />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
