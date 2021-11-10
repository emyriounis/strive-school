import Alert from "react-bootstrap/Alert";

const WarningSign = (props) => (
  <Alert className="text-center" variant="danger">
    {props.name}
  </Alert>
);
export default WarningSign;
