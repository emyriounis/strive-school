import { useEffect, useState } from "react";
import { Row, Form } from "react-bootstrap";

const AddComment = (props) => {
  const [enteredComment, setEnteredComment] = useState("");
  const [me, setMe] = useState({});

  const commentHandler = (event) => {
    setEnteredComment(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const commentData = {
      comment: enteredComment,
    };
    console.log(commentData);

    setEnteredComment("");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/posts/${props.postId}/comment`,
        {
          method: "POST",
          body: JSON.stringify({
            comment: commentData.comment,
            user: process.env.REACT_APP_ME_ID,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
      } else {
        console.error("fetch failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getMe = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/profile/${process.env.REACT_APP_ME_ID}`
      );
      if (response.ok) {
        const data = await response.json();
        setMe(data);
      } else {
        console.error("fetch failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => getMe(), []);

  return (
    <div className="d-flex">
      <img
        src={me.image}
        alt="profile picture"
        style={{ width: "42px", borderRadius: "50%", marginRight: "10px" }}
      />
      <form onSubmit={submitHandler} style={{ width: "100%" }}>
        <div className="input-group flex-nowrap">
          <div className="input-group-prepend"></div>
          <input
            type="text"
            className="form-control"
            placeholder="Add a new comment..."
            aria-label="Username"
            aria-describedby="addon-wrapping"
            value={enteredComment}
            onChange={commentHandler}
            style={{ borderRadius: "20px" }}
          />
        </div>
      </form>
    </div>
  );
};

export default AddComment;
