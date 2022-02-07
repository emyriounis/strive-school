import { useEffect, useState } from "react";
import {
  Col,
  Container,
  Form,
  FormControl,
  Row,
  Alert,
  Card,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import SingleJob from "./SingleJob";

const Home = () => {
  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState([]);

  const getJobs = async (s) => {
    try {
      const res = await fetch(
        `https://strive-jobs-api.herokuapp.com/jobs?search=${s}&limit=10`
      );
      if (res.ok) {
        const data = await res.json();
        setJobs(data.data);
      } else {
        throw new Error("Failed to fetch");
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => (search ? getJobs(search) : setJobs([])), [search]);
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

export default Home;
