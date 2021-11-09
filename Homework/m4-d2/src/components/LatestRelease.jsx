import { Row, Col, Card } from "react-bootstrap";

const LatestRelease = () => {
  const data = fetch(
    "https://s3.eu-west-1.amazonaws.com/eduflow-production/activity-resources/492286025160926.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2TAWW44RCEE6YREN%2F20211109%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20211109T154325Z&X-Amz-Expires=600&X-Amz-SignedHeaders=host&response-content-disposition=inline%3B%20filename%2A%3DUTF-8%27%27history.json&X-Amz-Signature=2ad8d420d2f9f7983ad0a5d7b5fe5da55b21561af3a8a7c57fead61a29a72136"
  ).then((response) => response.json());
  return (
    <Row xs={1} md={2} lg={3} xl={4} className="g-4">
      {/* {Array.from({ length: 4 }).map((_, idx) => (
        <Col>
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))} */}
      {console.log(data)}
    </Row>
  );
};

export default LatestRelease;
