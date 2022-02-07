import { useEffect, useState } from "react";
import { Alert, Button, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { addCompanyAction, removeCompanyAction } from "../redux/actions";
import { useParams } from "react-router-dom";
import SingleJob from "./SingleJob";
import { Star, StarFill } from "react-bootstrap-icons";

const mapStateToProps = (state) => ({
  favCom: state.favCom,
});

const mapDispatchToProps = (dispatch) => ({
  addToFavCom: (com) => {
    dispatch(addCompanyAction(com));
  },
  removeFromFavCom: (com) => {
    dispatch(removeCompanyAction(com));
  },
});

const Company = ({ favCom, addToFavCom, removeFromFavCom }) => {
  const { company } = useParams();
  const [companyJobs, setCompanyJobs] = useState([]);
  const [star, setStar] = useState(false);

  const getCompany = async (c) => {
    try {
      const res = await fetch(
        `https://strive-jobs-api.herokuapp.com/jobs?company=${c}`
      );
      if (res.ok) {
        const data = await res.json();
        setCompanyJobs(data.data);
      } else {
        throw new Error("Failed to fetch");
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getCompany(company);
    setStar(favCom.includes(company));
  }, []);

  useEffect(
    () => (star ? addToFavCom(company) : removeFromFavCom(company)),
    [star]
  );

  return (
    <Container fluid className="p-5">
      <Row>
        <Button variant="success" onClick={() => setStar(!star)}>
          {star ? <StarFill /> : <Star />}
        </Button>
      </Row>
      <Row>
        {companyJobs.length > 0 ? (
          companyJobs.map((job) => <SingleJob key={job._id} job={job} />)
        ) : (
          <Alert variant={"warning"}>
            This company has no jobs or doesn't exists
          </Alert>
        )}
      </Row>
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Company);
