import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Col, Form, FormControl } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import MessageMiddle from "./MessageMiddle";

const MessageMain = () => {
  const [profiles, setProfiles] = useState([]);

  const fetchingData = async () => {
    try {
      let res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/profile/`);
      if (res.ok) {
        let data = await res.json();
        setProfiles(data);
        console.log(data);
      } else {
        console.log("Something goes wrong while fetching the data");
      }
    } catch (err) {
      console.log("error connecting to the server");
    }
  };

  useEffect(() => {
    fetchingData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="profile-sub-section mt-0 container message-list">
      <Row className=" pt-3 pb-0">
        <Col xs="8">
          <p className=" pl-3 ">Messaging </p>
        </Col>
        <Col xs="4" className="d-flex align-items-center ">
          <i className="bi bi-three-dots"></i>
          <i className="bi bi-pencil-square"></i>
        </Col>
      </Row>
      <Row>
        <Col>
          <input
            className="w-25"
            type="search"
            placeholder="Search Nessage here"
            className=" w-100  "
          />
        </Col>
      </Row>

      <Row className="p-3 mt-0">
        {profiles &&
          profiles.slice(0, 10).map(({ _id, image, name, surname, title }) => (
            <Col xs="12" key={_id}>
              <MessageMiddle
                _id={_id}
                image={image}
                name={name}
                surname={surname}
                title={title}
              />
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default MessageMain;
