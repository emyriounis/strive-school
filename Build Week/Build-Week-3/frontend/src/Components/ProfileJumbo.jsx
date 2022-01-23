import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import { useLocation, Link, useParams } from "react-router-dom";
import MyButton from "./MyButton";
import { BsLinkedin } from "react-icons/bs";
import Form from "react-bootstrap/Form";

const ProfileJumbo = ({ data, handleShowModal, setDetailsChanged }) => {
  const location = useLocation();
  const path = location.pathname;
  const params = useParams();

  const [contactModal, setContactModal] = useState(false);
  const closeContactModal = () => setContactModal(false);
  const showContactModal = () => setContactModal(true);

  const [imageModal, setImageModal] = useState(false);
  const closeImageModal = () => setImageModal(false);
  const showImageModal = () => setImageModal(true);

  const [profileImage, setProfileImage] = useState(null);
  const [follow, setFollow] = useState(false);

  const updateProfilePic = async () => {
    const formData = new FormData();
    formData.append("profile-image", profileImage);
    console.log(formData);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/profile/${process.env.REACT_APP_ME_ID}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      if (response.ok) {
        setDetailsChanged((count) => count + 1);
      } else {
        console.error("something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleFollow = async (type) => {
    if (type) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/profile/${params.profileId}/follow`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ follower: process.env.REACT_APP_ME_ID }),
          }
        );
        if (response.ok) {
          setFollow(type);
        } else {
          console.error("something went wrong");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/profile/${params.profileId}/follow`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "DELETE",
            body: JSON.stringify({ follower: process.env.REACT_APP_ME_ID }),
          }
        );
        if (response.ok) {
          setFollow(type);
        } else {
          console.error("something went wrong");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (profileImage !== null) {
      updateProfilePic();
      closeImageModal();
    }
  }, [profileImage]);

  useEffect(
    () => setFollow(data?.followedBy.indexOf(process.env.REACT_APP_ME_ID) >= 0),
    [data]
  );

  return (
    <>
      {data && (
        <div className="profile-jumbo">
          <div className="d-flex justify-content-between">
            <img
              src={data.image}
              alt=""
              className="profile-image ml-4 mt-5"
              onClick={path === "/profile" ? showImageModal : closeImageModal}
            />
            <i className="bi bi-camera-fill bg-white mr-3 mt-4 pl-1"></i>
          </div>
          <div className="myDetails">
            <Row className="px-4 mt-2 pt-5 details-row">
              <Col xs="11" className="pb-3">
                <h3 className="mb-1">
                  {data.name} {data.surname}
                </h3>
                <p className="mb-1 reduced-text">{data.bio}</p>
                <p className="text-muted mb-1">
                  {data.area} &#8226;{" "}
                  <span className="text-link" onClick={showContactModal}>
                    Contact Info
                  </span>{" "}
                </p>
                <p className="text-link mb-2">
                  {data.followedBy.length} followers
                </p>
                {path === "/" ? (
                  <>
                    <MyButton type="button main-btn mr-2" text="Open to" />
                    <MyButton
                      type="button second-btn-outline mr-2"
                      text="Add Section"
                    />
                    <MyButton
                      type="button second-btn-outline mr-2"
                      text="More"
                    />
                  </>
                ) : (
                  <button
                    className="button main-btn-outline mr-2"
                    onClick={() => handleFollow(!follow)}
                  >
                    {follow ? "Following" : "Follow"}
                  </button>
                )}
              </Col>
              {path === "/profile" && (
                <i className="bi bi-pencil p-2" onClick={handleShowModal}></i>
              )}
            </Row>
          </div>
          <Modal show={contactModal} onHide={closeContactModal}>
            <Modal.Header closeButton>
              <Modal.Title>
                {data.name} {data.surname}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row className="my-2">
                <Col xs="1">
                  <BsLinkedin size="25px" />
                </Col>
                <Col xs="11">
                  <h5>Your Profile</h5>
                  <Link to="/profile">/profile</Link>
                </Col>
              </Row>
              <Row className="my-2">
                <Col xs="1">
                  <BsLinkedin size="25px" />
                </Col>
                <Col xs="11">
                  <h5>Email</h5>
                  <Link to="/profile">{data.email}</Link>
                </Col>
              </Row>
            </Modal.Body>
          </Modal>

          <Modal show={imageModal} onHide={closeImageModal}>
            <Modal.Header closeButton>
              <Modal.Title>Profile Photo</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-center">
              <img src={data.image} className="modalImage" alt="" />
            </Modal.Body>
            <Modal.Footer>
              <Form>
                <Form.Group className="mb-3 text-center">
                  <Form.Label>
                    Profile Picture
                    <Form.Control
                      type="file"
                      onChange={(e) => setProfileImage(e.target.files[0])}
                      style={{ display: "none" }}
                    />
                  </Form.Label>
                </Form.Group>
              </Form>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </>
  );
};

export default ProfileJumbo;
