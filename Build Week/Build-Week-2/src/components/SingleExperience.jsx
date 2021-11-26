import "../App.css";
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import ExperienceForm from "./ExperienceForm";
import { parseISO } from "date-fns";

const SingleExperience = ({ experience }) => {
  const [data, setData] = useState({
    area: "",
    company: "",
    description: "",
    endDate: "",
    role: "",
    startDate: "",
  });

  useEffect(
    () =>
      setData({
        area: experience.area,
        company: experience.company,
        description: experience.description,
        endDate: experience.endDate,
        role: experience.role,
        startDate: experience.startDate,
      }),
    [experience]
  );

  const styleDate = (date) => {
    const result = parseISO(date);
    return `${result.toString().slice(4, 7)} ${result
      .toString()
      .slice(11, 15)}`;
  };

  const randomColor = (size) => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

  return (
    <Row>
      <Col xs="auto" className="experience">
        <div
          className="square"
          style={{ backgroundColor: randomColor(6) }}
        ></div>
      </Col>
      <Col className="pl-0">
        <h6 className="m-0 ">{data.role}</h6>
        <p className="m-0">{data.company}</p>
        <p className="">
          {styleDate(data.startDate)} -{" "}
          {data.endDate ? styleDate(data.endDate) : "Present"}
        </p>
      </Col>
      <Col className="d-flex justify-content-end p-0 pr-4">
        <ExperienceForm
          id={experience._id}
          requestType={"put"}
          headline={"Web Developer"}
        />
      </Col>
    </Row>
  );
};

export default SingleExperience;
