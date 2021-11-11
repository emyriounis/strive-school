import "bootstrap/dist/css/bootstrap.min.css";
import BookList from "./components/BookList";
import data from "./assets/books.json";

const App = () => (
  <>
    <BookList books={data} />
  </>
);

export default App;
