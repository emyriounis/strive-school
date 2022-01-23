import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CommentList from "./CommentList";
import { Link, useLocation } from "react-router-dom";
import {
  parseISO,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
} from "date-fns";
import { BiWorld } from "react-icons/bi";
import AddComment from "./AddComment";
import { useEffect, useState } from "react";

const SinglePost = ({ post, handleEdit, profile }) => {
  const { pathname } = useLocation();
  const diffInM = differenceInMinutes(new Date(), parseISO(post.createdAt));
  const diffInH = differenceInHours(new Date(), parseISO(post.createdAt));
  const diffInD = differenceInDays(new Date(), parseISO(post.createdAt));
  const diffInW = differenceInWeeks(new Date(), parseISO(post.createdAt));
  const diffInMo = differenceInMonths(new Date(), parseISO(post.createdAt));
  const [liked, setLiked] = useState(false);
  const [display, setDisplay] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [load, setLoad] = useState(true);
  const fetchLike = async (like) => {
    try {
      if (like) {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/posts/${post._id}/like`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ user: process.env.REACT_APP_ME_ID }),
          }
        );
        if (res.ok) {
          const data = await res.json();
          setLiked(!liked);
        } else {
          alert("fetch failed");
        }
      } else {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/posts/${post._id}/like`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "DELETE",
            body: JSON.stringify({ user: process.env.REACT_APP_ME_ID }),
          }
        );
        if (res.ok) {
          setLiked(!liked);
        } else {
          alert("fetch failed");
        }
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => setLiked(post.likedByUser), []);

  return (
    <div className="profile-sub-section p-2 my-2">
      <Row className="pl-3 mb-2 justify-content-between mr-3 mt-2">
        <div className="d-flex w-75">
          <img
            src={pathname === "/" ? post.user.image : profile.image}
            className="profile-image-posts"
            alt=""
          />
          <div className="d-flex flex-column w-75 ml-2">
            <Link
              to={
                pathname === "/"
                  ? `/profile/${post.user._id}`
                  : `/profile/${profile._id}`
              }
              className="text-dark"
            >
              <h6 className="mb-0">
                {pathname === "/" ? post.user.name : profile.name}{" "}
                {pathname === "/" ? post.user.surname : profile.surname} &#8226;{" "}
                <span className="text-muted font-weight-normal">Following</span>
              </h6>
            </Link>
            <p className="text-muted reduced-text mb-0">
              {pathname === "/" ? post.user.bio : profile.bio}
            </p>
            <p className="text-muted mb-0">
              {diffInM < 60
                ? diffInM + "m"
                : diffInH < 24
                ? diffInH + "h"
                : diffInD < 7
                ? diffInD + "d"
                : diffInW < 4
                ? diffInW + "w"
                : diffInMo + "mo"}{" "}
              &#8226; <BiWorld />
            </p>
          </div>
        </div>
        {pathname === "/" && (
          <i
            className="bi bi-three-dots"
            onClick={() => handleEdit(post._id)}
          ></i>
        )}
      </Row>
      <p className="pl-2 mt-2 mb-2">{post.text}</p>
      {post.image && (
        <img src={post.image} className="w-100" onClick={handleShow} />
      )}
      <div className="d-flex justify-content-between align-items-center text-secondary">
        <div>{post.likes} likes</div>
        <div>{post.comment?.length} comments</div>
      </div>
      <hr className="my-1" />
      <Row className="text-muted post-actions justify-content-center">
        <Col
          xs="2"
          className="d-flex align-items-center justify-content-center p-2 mx-3 rounded"
          onClick={() => fetchLike(!liked)}
        >
          <i
            className={
              liked
                ? "bi bi-hand-thumbs-up-fill text-primary"
                : "bi bi-hand-thumbs-up"
            }
          ></i>
          <p className={liked ? "mb-0 ml-2 text-primary" : "mb-0 ml-2"}>
            {liked ? "Liked" : "Like"}
          </p>
        </Col>
        <Col
          xs="2"
          className="d-flex align-items-center justify-content-center p-2 mx-3 rounded"
        >
          <i className="bi bi-chat-right-text"></i>
          <p className="mb-0 ml-2" onClick={() => setDisplay(!display)}>
            Comment
          </p>
        </Col>
        <Col
          xs="2"
          className="d-flex align-items-center justify-content-center p-2 mx-3 rounded"
        >
          <i className="bi bi-arrow-90deg-right"></i>
          <p className="mb-0 ml-2">Share</p>
        </Col>
        <Col
          xs="2"
          className="d-flex align-items-center justify-content-center p-2 mx-3 rounded"
        >
          <i className="bi bi-send"></i>
          <p className="mb-0 ml-2">Send</p>
        </Col>
      </Row>
      {/* show comments */}
      <Row className={display ? "d-block" : "d-none"}>
        <Col xs={12}>
          <AddComment postId={post._id} />
          <CommentList comments={post.comment} />
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <img src={post.image} className="w-100" alt="" />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SinglePost;
