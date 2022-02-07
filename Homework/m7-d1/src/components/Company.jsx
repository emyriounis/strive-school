import { useEffect, useState } from "react";
import { Alert, Container, Form, FormControl, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import SingleJob from "./SingleJob";

const Company = () => {
  const { company } = useParams();
  const [companyJobs, setCompanyJobs] = useState([]);

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

  useEffect(() => getCompany(company), []);
  return (
    <Container fluid className="p-5">
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
