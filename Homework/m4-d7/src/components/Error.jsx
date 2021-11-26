import { Alert } from "react-bootstrap";

const Error = (props) => <Alert variant="danger">{props.error}</Alert>;

export default Error;
