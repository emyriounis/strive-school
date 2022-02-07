import { Alert, ListGroup } from "react-bootstrap";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Favorites = () => {
  const [companies, setCompanies] = useState([]);

  const favCom = useSelector((state) => state.favCom.companies);

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

export default Favorites;
