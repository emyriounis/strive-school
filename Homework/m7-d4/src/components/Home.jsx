import { useEffect, useState } from "react";
import { Container, Form, FormControl, Row, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { getJobsActions } from "../redux/actions";
import SingleJob from "./SingleJob";

const mapStateToProps = (state) => ({
  jobsList: state.jobs.data,
});

const mapDispatchToProps = (dispatch) => ({
  getJobs: (url) => {
    dispatch(getJobsActions(url));
  },
});

const Home = ({ jobsList, getJobs }) => {
  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState([]);

  const fetch = async (s) => {
    await getJobs(
      `https://strive-jobs-api.herokuapp.com/jobs?search=${s}&limit=10`
    );
  };

  useEffect(() => {
    search.length > 0 && fetch(search);
  }, [search]);

  useEffect(() => {
    jobsList ? setJobs(jobsList) : setJobs([]);
  }, [jobsList]);

  return (
    <Container fluid className="p-5">
      <Row className="mb-5">
        <Form className="d-flex px-0">
          <FormControl
            type="search"
            placeholder="Search..."
            aria-label="Search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </Form>
      </Row>
      <Row>
        {jobs.length > 0 ? (
          jobs.map((job) => <SingleJob key={job._id} job={job} />)
        ) : (
          <Alert variant={"warning"}>Please search for jobs</Alert>
        )}
      </Row>
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
