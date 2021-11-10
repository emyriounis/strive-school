import "bootstrap/dist/css/bootstrap.min.css";
import WarningSign from "./components/WarningSign";
import MyBadge from "./components/MyBadge";
import BookList from "./components/BookList";
import data from "./assets/books.json";

const App = () => (
  <>
    <WarningSign name="This is the Alert Message" />
    <MyBadge text="khfbgousrhfgoiwrnv" color="danger" />
    <BookList books={data} />
  </>
);

export default App;
