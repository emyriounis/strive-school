import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const SingleJob = ({ job }) => {
  const {
    _id,
    title,
    company_name,
    category,
    job_type,
    candidate_required_location,
    salary,
    description,
  } = job;
  return (
    <Card key={_id} className="px-0 my-3">
      <Card.Header>{`Tags: ${category}, ${job_type}, ${candidate_required_location}, ${salary}`}</Card.Header>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text
          dangerouslySetInnerHTML={{ __html: description }}
          className="mt-5 text-secondary"
        ></Card.Text>
        <Link to={`/${company_name}`}>
          <Button variant="primary">See more jobs from {company_name}</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default SingleJob;
