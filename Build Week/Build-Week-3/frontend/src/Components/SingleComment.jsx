import { Row, Col, Card } from "react-bootstrap";

const SingleComment = (props) => {
  return (
    <div className="d-flex">
      <div>
        <img
          src={props.comment.user.image}
          alt="profile"
          style={{ borderRadius: "50%", width: "42px " }}
        />
      </div>
      <div className="pl-3 w-100">
        <Card>
          <Card.Header>
            <h6
              className="text-dark mb-0"
              style={{ fontSize: "0.8em" }}
            >{`${props?.comment?.user?.name} ${props?.comment?.user?.surname}`}</h6>
            <h6 className="text-secondary" style={{ fontSize: "0.6em" }}>
              {props?.comment?.user?.title}
            </h6>
            <h6 className="text-dark" style={{ fontSize: "0.8em" }}>
              {props?.comment?.comment}
            </h6>
          </Card.Header>
        </Card>
      </div>
    </div>
  );
};

export default SingleComment;
