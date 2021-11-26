import "../styles/TopNav.css";
import { Button } from "react-bootstrap";
import { List, ChevronLeft, ChevronRight } from "react-bootstrap-icons";

const TopNav = ({ handleShow }) => {
  return (
    <div className="arrows d-flex align-items-center px-5 py-4 mt-3">
      <Button
        className="d-flex justify-content-center align-items-center p-2 me-4"
        variant="outline-dark"
        onClick={handleShow}
      >
        <List />
      </Button>
      <Button
        variant="dark"
        size="sm"
        className="
              d-flex
              justify-content-center
              align-items-center
              border-0
              rounded-circle
              p-2
              mx-1 mx-sm-2
            "
        onClick={() => window.history.back()}
      >
        <ChevronLeft />
      </Button>
      <Button
        variant="dark"
        size="sm"
        className="
              d-flex
              justify-content-center
              align-items-center
              border-0
              rounded-circle
              p-2
              mx-1 mx-sm-2
            "
        onClick={() => window.history.go(1)}
      >
        <ChevronRight />
      </Button>
    </div>
  );
};

export default TopNav;
