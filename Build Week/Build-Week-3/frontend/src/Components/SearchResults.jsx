import { Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SingleSearchResult from "./SingleSearchResults";

const SearchResults = ({ heading, type }) => {
  const { searchQuery } = useParams();
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/${type}`
      );
      if (response.ok) {
        const body = await response.json();
        setData(body);
        console.log(body);
      } else {
        console.error("Fetch Failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="profile-sub-section p-3 my-2">
      <h2 className="">{heading}</h2>
      <Row>
        <Col xs="12">
          {type === "profile"
            ? data &&
              data
                .filter((d) =>
                  (
                    d.name.toLowerCase() ||
                    d.surname.toLowerCase() ||
                    d.bio.toLowerCase()
                  ).includes(searchQuery.toLowerCase())
                )
                .slice(0, 3)
                .map((d) => <SingleSearchResult data={d} type={type} />)
            : data &&
              data
                .filter((d) =>
                  d.text.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .slice(0, 3)
                .map((d) => <SingleSearchResult data={d} type={type} />)}
          {/* {
                    (data && type ==='posts') && data.filter(d => d.text.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3).map(d => <SingleSearchResult data={d} type={type} /> )
                } */}
        </Col>
      </Row>
    </div>
  );
};

export default SearchResults;
