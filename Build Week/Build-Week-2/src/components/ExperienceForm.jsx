import { useState, useEffect } from "react";
import "../styles/experience-form.css";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { PencilFill, PlusLg } from "react-bootstrap-icons";
import { Link, useParams } from "react-router-dom";
import { getExperience } from "../api/getExperience";
import { putExperience } from "../api/putExperience";
import { postExperience } from "../api/postExperience";
import { deleteExperience } from "../api/deleteExperience";
import { postExperienceImage } from "../api/postExperienceImage";
import Loading from "./Loading";
import Error from "./Error";

const ExperienceForm = ({ requestType, headline, id }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const params = useParams();

  const [experienceToSubmit, setExperienceToSubmit] = useState({
    role: "",
    company: "",
    startDate: "",
    endDate: null,
    description: "",
    area: "",
  });

  useEffect(() => {
    const fetch = async () => {
      const data = await getExperience(params.id, id);
      setExperienceToSubmit({
        role: data.role || "",
        company: data.company || "",
        startDate: data.startDate.slice(0, 10) || "",
        endDate: (data.endDate && data.endDate.slice(0, 10)) || null,
        description: data.description || "",
        area: data.area || "",
      });
    };
    if (requestType === "put") {
      fetch();
    }
  }, [requestType, id, params.id]);

  const [stillWorkingAtRole, setStillWorkingAtRole] = useState(true);

  const handleEndDate = (checkboxValue) => {
    setStillWorkingAtRole(checkboxValue);
  };

  const [newHeadline, setNewHeadline] = useState(headline);
  // const [newIndustry, setNewIndustry] = useState(industry)
  const [textAreaValueLength, setTextAreaValueLength] = useState(0);

  const [show, setShow] = useState(false);
  const [notify, setNotify] = useState(true);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const resp =
        requestType === "put"
          ? await putExperience(params.id, id, experienceToSubmit)
          : await postExperience(params.id, experienceToSubmit);
      if (!resp.ok) {
        throw new Error("failed to fetch");
      }
      return resp;
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
      uploadProfileImage();
      handleClose();
    }
  };

  const handleDelete = async () => {
    try {
      const resp = await deleteExperience(params.id, id);
      if (!resp.ok) {
        throw new Error("failed to delete!");
      }
      return resp;
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const handleNotify = () => {
    setNotify(!notify);
  };

  const handleHeadline = (inputHeadline) => {
    setNewHeadline(inputHeadline);
  };
  // const handleIndustry = (inputIndustry) => {
  //     setNewIndustry(inputIndustry)
  // }

  const handleTextAreaValueLength = (inputTextAreaValue) => {
    setTextAreaValueLength(inputTextAreaValue);
  };

  const handleInput = (fieldKey, inputValue) => {
    setExperienceToSubmit({
      ...experienceToSubmit,
      [fieldKey]: inputValue,
    });
  };

  const [userProfile, setUserProfile] = useState({});

  const getUserProfile = async () => {
    try {
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/profile/me",
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
          },
        }
      );
      if (response.ok) {
        const userData = await response.json();
        setUserProfile(userData);
      } else {
        console.log("RESPONSE ERROR!");
      }
    } catch (error) {
      console.log("FETCH ERROR:" + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserProfile();
    // eslint-disable-next-line
  }, []);

  const [formData, setFormData] = useState({});

  const uploadProfileImage = async () => {
    try {
      const imgData = new FormData();
      imgData.append("experience", formData);
      const resp = await postExperienceImage(userProfile._id, id, imgData);
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
      {requestType === "post" ? (
        <PlusLg size={26} id="plus-icon-open-edit-form" onClick={handleShow} />
      ) : (
        <PencilFill
          size={20}
          id="pencil-icon-open-edit-form"
          onClick={handleShow}
        />
      )}
      <Modal id="experience-form-modal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            {requestType === "post" ? "Add Experience" : "Edit Experience"}{" "}
          </Modal.Title>
        </Modal.Header>
        <Alert variant="secondary">
          <Row>
            <Col xs={10}>
              <h6>Notify network</h6>
              <p>
                Turn on to notify your network. Job change updates can take up
                to 2 hours. <Link to="/">Learn more</Link>
              </p>
            </Col>
            <Col xs={2}>
              {notify ? (
                <ButtonGroup>
                  <Button
                    id="on-btn-enabled"
                    className="btn-sm"
                    variant="success"
                    onClick={handleNotify}
                  >
                    On
                  </Button>
                  <Button
                    id="off-btn-disabled"
                    className="btn-sm"
                    variant="outline-secondary"
                    disabled
                  >
                    Off
                  </Button>
                </ButtonGroup>
              ) : (
                <ButtonGroup>
                  <Button
                    id="off-btn-enabled"
                    className="btn-sm"
                    variant="secondary"
                    onClick={handleNotify}
                  >
                    Off
                  </Button>
                  <Button
                    id="on-btn-disabled"
                    className="btn-sm"
                    variant="outline-success"
                    disabled
                  >
                    On
                  </Button>
                </ButtonGroup>
              )}
            </Col>
          </Row>
        </Alert>
        <Modal.Body>
          <Form>
            <Form.Group controlId="title">
              <Form.Label>Title*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex: Retail Sales Manager"
                required
                value={experienceToSubmit.role}
                onChange={(e) => handleInput("role", e.target.value)}
              />
            </Form.Group>
            {/* <Form.Group controlId="employmentType">
                            <Form.Label>Employment type</Form.Label>
                            <Form.Control as="select">
                                <option>Full-time</option>
                                <option>Part-time</option>
                                <option>Self-employed</option>
                                <option>Freelance</option>
                                <option>Contract</option>
                                <option>Internship</option>
                                <option>Apprenticeship</option>
                            </Form.Control>
                            <p>Country-specific employment types</p>
                            <Link id="employment-type-link" to="/">Learn more</Link>
                        </Form.Group> */}
            <Form.Group controlId="company">
              <Form.Label>Company name*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex: Microsoft"
                required
                value={experienceToSubmit.company}
                onChange={(e) => handleInput("company", e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex: London, United Kingdom"
                required
                value={experienceToSubmit.area}
                onChange={(e) => handleInput("area", e.target.value)}
              />
            </Form.Group>
            <div id="stillWorkingAtRole" className="mb-3">
              <input
                type="checkbox"
                id="stillWorkingAtRoleCheckbox"
                name="stillWorkingAtRoleCheckbox"
                onChange={(e) => handleEndDate(e.target.checked)}
                checked={stillWorkingAtRole}
              />
              <label for="stillWorkingAtRoleCheckbox" className="ml-2 mt-3">
                I am currently working at this role
              </label>
            </div>

            <Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="startDate">
                  <Form.Label>Start date*</Form.Label>
                  <Form.Control
                    type="date"
                    required
                    value={experienceToSubmit.startDate}
                    onChange={(e) => handleInput("startDate", e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                {!stillWorkingAtRole && (
                  <Form.Group controlId="endDate">
                    <Form.Label>End date*</Form.Label>
                    <Form.Control
                      type="date"
                      required
                      value={experienceToSubmit.endDate || ""}
                      onChange={(e) => handleInput("endDate", e.target.value)}
                    />
                  </Form.Group>
                )}
              </Col>
            </Row>
            <Form.Group controlId="headline">
              <Form.Label>Headline</Form.Label>
              <Form.Control
                type="text"
                value={newHeadline}
                onChange={(e) => handleHeadline(e.target.value)}
              />
            </Form.Group>
            {/* <Form.Group controlId="industry">
                            <Form.Label>Industry*</Form.Label>
                            <Form.Control type="text" value={newIndustry} onChange={(e) => handleIndustry(e.target.value)} required />
                            <p id="industry-disclaimer">LinkedIn uses industry information to provide more relevant recommendations</p>
                        </Form.Group> */}
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                maxLength="2000"
                value={experienceToSubmit.description}
                onChange={(e) => handleInput("description", e.target.value)}
                onInput={(e) =>
                  handleTextAreaValueLength(e.target.value.length)
                }
              />
              <div className="d-flex justify-content-end">
                <p id="characterCount">{textAreaValueLength}/2,000</p>
              </div>
            </Form.Group>
            <Form.Group>
              <div className="form-label">
                <p>Media</p>
                <p>
                  Add or link to external documents, photos, sites, videos, and
                  presentations. <Link to="/learn-more">Learn more</Link>{" "}
                </p>
              </div>
              <Form.Label
                id="choose-file-label"
                className="mt-3 btn btn-outline-primary"
                for="choose-file-btn"
              >
                <PlusLg id="plus-icon-add-media" size={18} /> Add media
              </Form.Label>
              <Form.Control
                id="choose-file-btn"
                type="file"
                onChange={(event) => {
                  setFormData(event.target.files[0]);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer
          className={`d-flex ${
            requestType === `put`
              ? `justify-content-between`
              : `justify-content-end`
          }`}
        >
          {requestType === "put" && (
            <Button id="delete-experience-btn" onClick={handleDelete}>
              Delete experience
            </Button>
          )}

          <Button
            id="save-experience-btn"
            className="px-3 py-1"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ExperienceForm;
