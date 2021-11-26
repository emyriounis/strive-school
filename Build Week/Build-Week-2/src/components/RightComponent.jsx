import { useEffect, useState } from "react";
import { Container, Row, Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./RightComponent.css";

const RightComponent = () => {
  const [person, setPerson] = useState([]);
  // let token = process.env.REACT_APP_TOKEN);
  const getPerson = async () => {
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/profile/",
        {
          headers: {
            method: "GET",
            "Content-type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTRiMmEwMDRiYjUzZDAwMTViMTlmODkiLCJpYXQiOjE2Mzc1ODkxNTYsImV4cCI6MTYzODc5ODc1Nn0.R82gI1w_H-zy1zE4Vvm_fL1qJWc8fo-0lG8mcUE1OW0",
          },
        }
      );
      if (response.ok) {
        let data = await response.json();
        setPerson(data);
      } else {
        console.log("ERROR");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPerson();
  }, []);

  return (
    <div className="leftcomponent mt-5" style={{ background: "transparent" }}>
      <div className="addfeed">
        <h6>Add your feed</h6>

        <Container>
          {person.slice(0, 4).map((m, i) => (
            <Row key={i} className="p-2">
              <img
                src={m.image}
                alt="satya nadela img"
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              />
              <h6 className="mb-0 ml-2">
                {m.name + " " + m.surname}
                {/* <img
                  src="https://w7.pngwing.com/pngs/329/312/png-transparent-in-logo-linkedin-computer-icons-social-media-professional-network-service-youtube-linkedin-miscellaneous-blue-angle.png"
                  alt="linkedin"
                  style={{ width: "15px", marginLeft: "2px" }}
                /> */}
                <p className="mb-1 text-muted" style={{ fontSize: "11px" }}>
                  {m.title}
                </p>
                <Link to={`/profile/${m._id}`}>
                  <Button variant="outline-secondary" className="follow m-1">
                    <i className="fas fa-plus mr-1"></i>
                    Follow
                  </Button>
                </Link>
              </h6>
            </Row>
          ))}
        </Container>
        <Dropdown.Item
          className="p-0"
          eventKey="4"
          style={{ fontSize: "13px", color: "grey" }}
        >
          <strong>
            View all recommendations <i className="fas fa-arrow-right"></i>
          </strong>
        </Dropdown.Item>
      </div>

      <div className="footerimg">
        <img
          src="https://www.sendiancreations.com/wp-content/uploads/2019/08/LinkedIn-Marketing.jpg"
          alt="img linkedIn add"
          style={{ width: "100%" }}
        />
      </div>
      <footer className="footer">
        <Row>
          <p
            className="col m-0 p-0 text-right about"
            style={{ fontSize: "13px" }}
          >
            About
          </p>
          <p
            className="col m-0 p-0 text-center accessibility"
            style={{ fontSize: "13px" }}
          >
            Accessibility
          </p>
          <p
            className="col m-0 p-0 text-left helpcenter"
            style={{ fontSize: "13px" }}
          >
            Help Center
          </p>
        </Row>
        <Row>
          <p
            className="col m-0 p-0 text-right privacy"
            style={{ fontSize: "13px" }}
          >
            Privacy and Terms<i className="fas fa-chevron-down ml-1"></i>
          </p>
          <p
            className="col m-0 p-0 text-center choices"
            style={{ fontSize: "13px" }}
          >
            Add Choices
          </p>
        </Row>
        <Row>
          <p
            className="col m-0 p-0 text-right advertising"
            style={{ fontSize: "13px" }}
          >
            Advertising
          </p>
          <p
            className="col m-0 p-0 text-center business"
            style={{ fontSize: "13px" }}
          >
            Business Services<i className="fas fa-chevron-down ml-1"></i>
          </p>
        </Row>
        <Row>
          <p
            className="col m-0 p-0 text-right add "
            style={{ fontSize: "13px" }}
          >
            Get the LinkedIn add
          </p>
          <p
            className="col m-0 p-0 text-center more"
            style={{ fontSize: "13px" }}
          >
            More
          </p>
        </Row>
        <Container>
          <Row>
            <img
              src="https://www.amocrm.com/static/images/pages/integrations/logo/linkedin.png"
              alt="logo"
              style={{ width: "90px", padding: "0" }}
            />
            <p
              className="col m-0 p-0 text-right add mt-4 "
              style={{ fontSize: "13px" }}
            >
              LinkedIn Corporation{" "}
              <img
                src="data:image/png;base64,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"
                alt=""
                style={{ width: "12px" }}
              />
              2021
            </p>
          </Row>
        </Container>
      </footer>
    </div>
  );
};
export default RightComponent;
