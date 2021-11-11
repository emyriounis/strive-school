import AddComment from "./AddComment";
import CommentsList from "./CommentsList";

const CommentArea = (props) => (
  <>
    <CommentsList comments={props.comments} />
    <AddComment id={props.book} />
  </>
);

export default CommentArea;
