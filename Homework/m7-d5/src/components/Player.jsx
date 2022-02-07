import "../styles/Player.css";
import {
  Container,
  Row,
  Col,
  Image,
  ProgressBar,
  Button,
} from "react-bootstrap";
import {
  Heart,
  HeartFill,
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
import {
  removeFromLikedSongsAction,
  addToLikedSongsAction,
} from "../../src/redux/actions";
import { useEffect, useState } from "react";
import { connect } from "react-redux";

const mapStateToProps = (s) => s;

const mapDispatchToProps = (dispatch) => ({
  addSong: (song) => {
    dispatch(addToLikedSongsAction(song));
  },
  removeSong: (song) => {
    dispatch(removeFromLikedSongsAction(song));
  },
});

const Player = (props) => {
  const [liked, setLiked] = useState(false);

  useEffect(
    () =>
      liked
        ? props.addSong(props.selectedSong.selectedSong)
        : props.removeSong(props.selectedSong.selectedSong),
    [liked]
  );

  useEffect(
    () => setLiked(props.liked.songs.includes(props.selectedSong.selectedSong)),
    [props]
  );

  useEffect(() => {}, [props]);
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
              src={props?.selectedSong?.selectedAlbum?.album.cover_small}
              alt="album cover"
            />
            <div className="p-2">
              <div className="albumTitle">
                {props?.selectedSong?.selectedSong?.title ||
                  "not selected song"}
              </div>
              <div className="text-secondary albumGroup">
                {props?.selectedSong?.selectedAlbum?.album.title}
              </div>
            </div>
            <div className="d-flex">
              <div className="px-2">
                <Button variant="success" onClick={() => setLiked(!liked)}>
                  {liked ? <HeartFill /> : <Heart />}
                </Button>
                {/* {liked ? <SuitHeart size={12} onClick={() => {addToLikedSongsAction(data)}} /> : <FiHeart size={12} onClick={() => {removeFromLikedSongsAction(data)}} />} */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Player);
