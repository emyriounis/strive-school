import { useEffect, useState } from "react";
import { Col, Container, Row, Modal, Button, Form } from "react-bootstrap";
import ProfileJumbo from "../Components/ProfileJumbo";
import Sidebar from "../Components/Sidebar";
import Dashboard from "../Components/Dashboard";
import ProfileSubSection from "../Components/ProfileSubSection";
import SkillDropDown from "../Components/SkillDropDown";
import Experience from "../Components/Experience";
import Licence from "../Components/Licence";

const Profile = ({ myInfo }) => {
  const [data, setData] = useState(null);
  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);
  const [bio, setBio] = useState(null);
  const [area, setArea] = useState(null);
  const [detailsChanged, setDetailsChanged] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const fetchMyDetails = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/profile/${process.env.REACT_APP_ME_ID}`
      );
      if (response.ok) {
        const data = await response.json();
        setData(data);
        setName(data.name);
        setSurname(data.surname);
        setBio(data.bio);
        setArea(data.area);
      } else {
        console.error("fetch failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMyDetails();
    // eslint-disable-next-line
  }, [detailsChanged]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleCloseModal();
    const newDetails = {
      name: name,
      surname: surname,
      bio: bio,
      area: area,
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/profile/${process.env.REACT_APP_ME_ID}`,
        {
          method: "PUT",
          body: JSON.stringify(newDetails),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setDetailsChanged((count) => count + 1);
      } else {
        console.error("Fetch Failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Row>
        <Col xs="12" md="8">
          <ProfileJumbo
            data={data}
            handleShowModal={handleShowModal}
            setDetailsChanged={setDetailsChanged}
          />
          <Dashboard />
          <ProfileSubSection heading="Activity" myInfo={myInfo} />
          <Experience heading="Experience" />
          <SkillDropDown />
          <Licence />
          <ProfileSubSection heading="Interests" />
        </Col>
        <Col xs="12" md="4">
          <Sidebar />
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Bio</Form.Label>
              <Form.Control
                type="text"
                placeholder="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Location"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Profile;
