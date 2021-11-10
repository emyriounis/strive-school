import Badge from "react-bootstrap/Badge";

const MyBadge = (props) => <Badge variant={props.color}>{props.text}</Badge>;

export default MyBadge;
