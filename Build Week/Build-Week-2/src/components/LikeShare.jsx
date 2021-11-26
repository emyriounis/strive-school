import { Button, OverlayTrigger, Row, Tooltip } from "react-bootstrap";

const LikeShare = () => {
  return (
    <Row className="d-flex justify-content-around">
      <OverlayTrigger
        clasName="tooltiplike"
        overlay={
          <Tooltip>
            <i className="far fa-thumbs-up fa-2x p-1"></i>
            <i className="fas fa-hand-holding-heart fa-2x p-1"></i>
            <i className="far fa-heart fa-2x p-1"></i>
            <i className="far fa-lightbulb fa-2x p-1"></i>
            <i className="far fa-meh-rolling-eyes fa-2x p-1"></i>
          </Tooltip>
        }
      >
        <span className="d-inline-block">
          <Button variant="outline-secondary" className="like">
            <i className="far fa-thumbs-up likeshare"></i> Like
          </Button>
        </span>
      </OverlayTrigger>
      <Button className="like" variant="outline-secondary">
        <i className="far fa-comment likeshare"></i> Comment
      </Button>
      <Button className="like" variant="outline-secondary">
        <i className="fas fa-share likeshare"></i> Share
      </Button>
      <Button className="like" variant="outline-secondary">
        <i className="fas fa-paper-plane likeshare"></i> Send
      </Button>
    </Row>
  );
};

export default LikeShare;
