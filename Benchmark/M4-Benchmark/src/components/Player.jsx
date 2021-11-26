import "../styles/Player.css";
import { Container, Row, Col, Image, ProgressBar } from "react-bootstrap";
import {
  SuitHeart,
  Pip,
  Shuffle,
  ChevronDoubleLeft,
  PlayCircleFill,
  ChevronDoubleRight,
  ArrowRepeat,
  TextIndentLeft,
  Speaker,
  VolumeUp,
} from "react-bootstrap-icons";

const Player = () => {
  return (
    <>
      <Container
        fluid
        className="player text-light bg-dark"
        style={{ zIndex: "2" }}
      >
        <Row className="align-items-center">
          <Col className="d-flex justify-content-start align-items-center">
            <Image
              className="img"
              src="https://thumbs.dreamstime.com/b/dynamic-radial-color-sound-equalizer-design-music-album-cover-template-abstract-circular-digital-data-form-vector-160916775.jpg"
              alt="album cover"
            />
            <div className="p-2">
              <div className="albumTitle">
                Another One Bites The Dust - Remastered 2011
              </div>
              <div className="text-secondary albumGroup">Queen</div>
            </div>
            <div className="d-flex">
              <div className="px-2">
                <SuitHeart size={12} />
              </div>
              <div className="px-2">
                <Pip size={12} />
              </div>
            </div>
          </Col>
          <Col xs={12} lg={6}>
            <div className="d-flex justify-content-center pb-2">
              <div className="px-2">
                <Shuffle />
              </div>
              <div className="px-2">
                <ChevronDoubleLeft />
              </div>
              <div className="px-2">
                <PlayCircleFill />
              </div>
              <div className="px-2">
                <ChevronDoubleRight />
              </div>
              <div className="px-2">
                <ArrowRepeat />
              </div>
            </div>
            <div className="time d-flex justify-content-center align-items-center w-100">
              <div className="px-2">1:12</div>
              <div className="progress w-100">
                <ProgressBar striped variant="success" now={40} />
              </div>
              <div className="px-2">-3:36</div>
            </div>
          </Col>
          <Col className="d-flex justify-content-end align-items-center">
            <div className="d-flex align-items-center px-1">
              <TextIndentLeft size={12} />
            </div>
            <div className="d-flex align-items-center px-1">
              <Speaker size={12} />
            </div>
            <div className="d-flex align-items-center px-1">
              <VolumeUp size={12} />
            </div>
            <div className="progress w-25">
              <ProgressBar variant="secondary" now={40} />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Player;
