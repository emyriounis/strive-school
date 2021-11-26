import "../styles/newPost.css";
import { useState, useEffect } from "react";
import {
  Image,
  Button,
  Modal,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import {
  BarChartLineFill,
  BlockquoteLeft,
  BriefcaseFill,
  CalendarDateFill,
  CaretDownFill,
  ChatLeftTextFill,
  ChatTextFill,
  FileEarmarkTextFill,
  Globe2,
  ImageFill as ImageIcon,
  Info,
  PlayBtnFill,
  ThreeDots,
} from "react-bootstrap-icons";
import { getProfileMe } from "../api/getProfileMe";
import { postPostImage } from "../api/postPostImage";
import postPost from "../api/postPost";
import Loading from "./Loading";
import Error from "./Error";

const NewPost = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [show, setShow] = useState(false);
  const handleModal = (type) => setShow(type);

  const [addPhoto, setAddPhoto] = useState(false);

  const [post, setPost] = useState("");

  const loadProfileMe = async () => {
    try {
      const resp = await getProfileMe();
      setUser(resp);
      return resp;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const uploadPost = async () => {
    try {
      const resp = await postPost({ text: post });
      if (!resp.ok) {
        setError("failed to upload!");
      }
      console.log(resp);
      uploadPostImage(resp._id);
      return resp;
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      handleModal(false);
      setPost("");
      setError(false);
    }
  };

  useEffect(() => loadProfileMe(), []);

  const [formData, setFormData] = useState({});

  const uploadPostImage = async (postID) => {
    try {
      const imgData = new FormData();
      imgData.append("post", formData);
      const resp = await postPostImage(postID, imgData);
      console.log(resp);
      return resp;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      <div
        className="newPost px-3 pt-3 pb-1 mt-5"
        style={{ background: "#fff" }}
      >
        <div className="d-flex">
          <Image className="newPostProfileImg" src={user.image} />
          <Button
            className="newPostStartPostButton text-left mx-2"
            variant="outline-secondary"
            onClick={() => handleModal(true)}
          >
            Start a post
          </Button>
        </div>
        <div className="d-flex justify-content-between">
          <div className="newPostCategory d-flex align-items-center mt-2">
            <ImageIcon className="newPostIcons text-primary m-2" size={24} />
            <span className="newPostCategoryText text-secondary m-2">
              Photo
            </span>
          </div>
          <div className="newPostCategory d-flex align-items-center mt-2">
            <PlayBtnFill className="newPostIcons text-success m-2" size={24} />
            <span className="newPostCategoryText text-secondary m-2">
              Video
            </span>
          </div>
          <div className="newPostCategory d-flex align-items-center mt-2">
            <CalendarDateFill
              className="newPostIcons text-warning m-2"
              size={24}
            />
            <span className="newPostCategoryText text-secondary m-2">
              Event
            </span>
          </div>
          <div className="newPostCategory d-flex align-items-center mt-2">
            <BlockquoteLeft
              className="newPostIcons text-danger m-2"
              size={24}
            />
            <span className="newPostCategoryText text-secondary m-2">
              Write article
            </span>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={() => handleModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create a post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex align-items-center">
            <div className="p-1">
              <Image className="newPostProfileImg" src={user.image} />
            </div>
            <div className="p-1">
              <Button
                className="newPostStartPostButton d-flex align-items-center mx-2"
                variant="outline-secondary"
              >
                <Info size={24} />
                <span>Eleftherios Myriounis</span>
                <CaretDownFill className="ml-2" />
              </Button>
            </div>
            <div className="p-1">
              <Button
                className="newPostStartPostButton d-flex align-items-center mx-2"
                variant="outline-secondary"
              >
                <Globe2 className="mr-2" />
                <span>Anyone</span>
                <CaretDownFill className="ml-2" />
              </Button>
            </div>
          </div>
          <Form.Group className="my-3">
            <Form.Control
              as="textarea"
              value={post}
              placeholder="What do you want to tlk about?"
              rows={3}
              onChange={(event) => setPost(event.target.value)}
            />
          </Form.Group>
          {addPhoto && (
            <Form.Group>
              <Form.Label>Post Photo</Form.Label>
              <Form.Control
                type="file"
                onChange={(event) => {
                  setFormData(event.target.files[0]);
                }}
              />
            </Form.Group>
          )}
          <Button className="hashtagButton" variant="outline-primary">
            Add hashtage
          </Button>
          <div className="d-flex align-items-center">
            <div className="border-right d-flex align-items-center mt-3 mr-2">
              <div
                className="newPostBottomIcons d-flex justify-content-center align-items-center text-secondary p-2"
                onClick={() => setAddPhoto(!addPhoto)}
              >
                <OverlayTrigger
                  key="top"
                  placement="top"
                  overlay={<Tooltip>Add a photo</Tooltip>}
                >
                  <ImageIcon size={20} />
                </OverlayTrigger>
              </div>
              <div className="newPostBottomIcons d-flex justify-content-center align-items-center text-secondary p-2">
                <OverlayTrigger
                  key="top"
                  placement="top"
                  overlay={<Tooltip>Add a video</Tooltip>}
                >
                  <PlayBtnFill size={20} />
                </OverlayTrigger>
              </div>
              <div className="newPostBottomIcons d-flex justify-content-center align-items-center text-secondary p-2">
                <OverlayTrigger
                  key="top"
                  placement="top"
                  overlay={<Tooltip>Add a document</Tooltip>}
                >
                  <FileEarmarkTextFill size={20} />
                </OverlayTrigger>
              </div>
              <div className="newPostBottomIcons d-flex justify-content-center align-items-center text-secondary p-2">
                <OverlayTrigger
                  key="top"
                  placement="top"
                  overlay={<Tooltip>Share that you're hiring</Tooltip>}
                >
                  <BriefcaseFill size={20} />
                </OverlayTrigger>
              </div>
              <div className="newPostBottomIcons d-flex justify-content-center align-items-center text-secondary p-2">
                <OverlayTrigger
                  key="top"
                  placement="top"
                  overlay={<Tooltip>Celebrate an occation</Tooltip>}
                >
                  <ChatLeftTextFill size={20} />
                </OverlayTrigger>
              </div>
              <div className="newPostBottomIcons d-flex justify-content-center align-items-center text-secondary p-2">
                <OverlayTrigger
                  key="top"
                  placement="top"
                  overlay={<Tooltip>Create a poll</Tooltip>}
                >
                  <BarChartLineFill size={20} />
                </OverlayTrigger>
              </div>
              <div className="newPostBottomIcons d-flex justify-content-center align-items-center text-secondary p-2">
                <OverlayTrigger
                  key="top"
                  placement="top"
                  overlay={<Tooltip>Add to your post</Tooltip>}
                >
                  <ThreeDots size={20} />
                </OverlayTrigger>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3 ml-2 w-100">
              <div className="newPostBottomIcons d-flex justify-content-center align-items-center text-secondary p-2">
                <ChatTextFill className="mr-2" size={20} />
                Anyone
              </div>
              <div className="newPostBottomIcons d-flex justify-content-center align-items-center text-secondary p-2">
                <Button
                  className="post-button"
                  variant="secondary"
                  onClick={uploadPost}
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NewPost;
