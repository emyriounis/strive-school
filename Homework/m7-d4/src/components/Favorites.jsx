import { Alert, ListGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Favorites = ({ favCom }) => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => setCompanies(favCom), []);
  return (
    <>
      <div className="p-5">Favorite Companies</div>
      <ListGroup className="px-5">
        {companies.length > 0 ? (
          companies.map((c) => (
            <ListGroup.Item>
              <Link to={`/${c}`}>{c}</Link>
            </ListGroup.Item>
          ))
        ) : (
          <Alert variant="warning">No favorite Companies</Alert>
        )}
      </ListGroup>
    </>
  );
};

export default connect((s) => s)(Favorites);
