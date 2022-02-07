import { useEffect, useState } from "react";
import { Alert, Button, Container, Row } from "react-bootstrap";

import {
  addCompanyAction,
  getJobsActions,
  removeCompanyAction,
} from "../redux/actions";
import { useParams } from "react-router-dom";
import SingleJob from "./SingleJob";
import { Star, StarFill } from "react-bootstrap-icons";
import { useSelector, useDispatch } from "react-redux";

const Company = () => {
  const { company } = useParams();
  const [companyJobs, setCompanyJobs] = useState([]);
  const [star, setStar] = useState(false);

  const favCom = useSelector((state) => state.favCom.companies);
  const jobs = useSelector((state) => state.jobs.data);

  const dispatch = useDispatch();

  const fetch = async (company) => {
    await dispatch(
      getJobsActions(
        `https://strive-jobs-api.herokuapp.com/jobs?company=${company}`
      )
    );
  };

  useEffect(() => {
    fetch(company);
    setStar(favCom.includes(company));
  }, []);

  useEffect(
    () =>
      star
        ? dispatch(addCompanyAction(company))
        : dispatch(removeCompanyAction(company)),
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

export default Company;
