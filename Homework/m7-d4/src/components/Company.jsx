import { useEffect, useState } from "react";
import { Alert, Button, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import {
  addCompanyAction,
  getJobsActions,
  removeCompanyAction,
} from "../redux/actions";
import { useParams } from "react-router-dom";
import SingleJob from "./SingleJob";
import { Star, StarFill } from "react-bootstrap-icons";

const mapStateToProps = (state) => ({
  favCom: state.favCom.companies,
  jobs: state.jobs.data,
});

const mapDispatchToProps = (dispatch) => ({
  addToFavCom: (com) => {
    dispatch(addCompanyAction(com));
  },
  removeFromFavCom: (com) => {
    dispatch(removeCompanyAction(com));
  },
  getJobs: (url) => {
    dispatch(getJobsActions(url));
  },
});

const Company = ({ favCom, jobs, addToFavCom, removeFromFavCom, getJobs }) => {
  const { company } = useParams();
  const [companyJobs, setCompanyJobs] = useState([]);
  const [star, setStar] = useState(false);

  const fetch = async (company) => {
    await getJobs(
      `https://strive-jobs-api.herokuapp.com/jobs?company=${company}`
    );
  };

  useEffect(() => {
    fetch(company);
    setStar(favCom.includes(company));
  }, []);

  useEffect(
    () => (star ? addToFavCom(company) : removeFromFavCom(company)),
    [star]
  );

  useEffect(() => setCompanyJobs(jobs), [jobs]);

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
