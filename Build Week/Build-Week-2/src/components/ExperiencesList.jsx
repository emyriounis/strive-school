import { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useParams } from "react-router";
import SingleExperience from "./SingleExperience";
import ExperienceForm from "./ExperienceForm";
import { getExperiences } from "../api/getExperiences";
import Loading from "./Loading";
import Error from "./Error";

const ExperiencesList = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const params = useParams();

  const loadExperiences = async () => {
    if (loading) {
      try {
        const resp = await getExperiences(params.id);
        setExperiences(resp);
        return resp;
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
  };
  // eslint-disable-next-line
  useEffect(() => loadExperiences(), []);

  console.log(experiences);

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      <Container className="singleexperience p-2">
        <Row className="p-2">
          <Col>
            <h4>Experience</h4>
          </Col>
          <Col className="d-flex justify-content-end p-0 pr-3">
            <ExperienceForm requestType={"post"} headline={"Web Developer"} />
          </Col>
        </Row>
        {experiences.map((exp) => (
          <SingleExperience key={exp._id} experience={exp} />
        ))}
      </Container>
    </>
  );
};

export default ExperiencesList;
