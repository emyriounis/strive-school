//Put the icon
// onclick of an icon
//put a form

import { Container, Row, Col, Button } from "react-bootstrap";
import "../styles/ProfileJumbotron.css";
// import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import JumbotronEditForm from "./JumbotronEditForm";
import ProfileEditForm from './ProfileEditForm'

const ProfileJumbotron = ({ id }) => {
  const [info, setInfo] = useState([]);
  let myToken = process.env.REACT_APP_TOKEN;
  let profileUrl = "https://striveschool-api.herokuapp.com/api/profile/";

  const fetching = async () => {
    try {
      const response = await fetch(profileUrl + id, {
        headers: {
          method: "GET",
          "Content-type": "application/json",
          Authorization: `Bearer ${ myToken }`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setInfo(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetching(); // eslint-disable-next-line
  }, [id]);
  return (
    <>
      {/* <h2>ProfileJumbotron {id}</h2> */}
      <Container
        className="profile-jumbotron pb-4 mt-5"
        style={{ background: "#fff" }}
      >
        <Row className="profile-jumbotron-rows profile-jumbotron-bgImg">
          <img src="http://placehold.it/1138x200" alt="" />
        </Row>
        <div className="profile-img-container">
          <img src={info.image} alt="" className="profile-img img-fluid" />
        </div>
        <div className="jumbo-form-container">
          {/* <JumbotronEditForm className="jumbo-pencil" /> */}
          <ProfileEditForm className="jumbo-pencil" profileDetails={info} />
        </div>
        <Row className="profile-jumbotron-rows profile-jumbotron-info">
          <Col xs={12} md={9}>
            <h4 className="user-name mb-0">
              {info.name} {info.surname}
            </h4>
            <p className="my-0 occupation">{info.title}</p>
            <p className="my-0 location text-muted">
              {info.area} •
              <span className="contact-info-link "> Contact info </span>
            </p>
            <p className="my-2 num-of-connections">52 connections</p>
            <div className="d-flex justify-content-start w-100">
              <Button className="jumbotron-btns open-to-btn">Open to</Button>
              <Button
                variant="outline-primary"
                className="jumbotron-btns add-section-btn mx-2"
              >
                Add section
              </Button>
              <Button
                variant="outline-secondary"
                className="jumbotron-btns more-btn"
              >
                More
              </Button>
            </div>
          </Col>
          <Col xs={12} md={3}>
            <ul>
              <li className="organizations">Google</li>
              <li className="organizations">Harvard University</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfileJumbotron;
