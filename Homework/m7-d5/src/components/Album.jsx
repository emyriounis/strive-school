import "../styles/Album.css";
import { useState, useEffect } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { useParams } from "react-router";
import { Heart, MusicNote, ThreeDots } from "react-bootstrap-icons";
import Loading from "./Loading";
import Error from "./Error";
import { run as runHolder } from "holderjs/holder";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import { addTrackAction } from "../redux/actions/playlistsAction.js";
import { BsThreeDotsVertical } from "react-icons/bs";
import { addSelectedSong, addSelectedAlbum } from "../redux/actions";

const mapStateToProps = (state) => ({
  playlists: state.playlists.createdLists,
  select: state,
});

const mapDispatchToProps = (dispatch) => ({
  addTrack: (track, list) => {
    dispatch(addTrackAction(track, list));
  },
  selectedSong: (song) => {
    // book is the book object, with price, title, description
    // dispatch(addToCartAction(book))
    dispatch(addSelectedSong(song));
  },
  selectedAlbum: (album) => {
    dispatch(addSelectedAlbum(album));
  },
});

const Album = ({ playlists, addTrack, selectedSong }) => {
  console.log(playlists);
  const params = useParams();

  const [album, setAlbum] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [track, setTrack] = useState({});

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (track) => {
    setShow(true);
    setTrack(track);
  };

  const getAlbum = async (id) => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/deezer/album/${id}`
      );
      if (!response.ok) {
        setError("failed to fetch");
      } else {
        const data = await response.json();
        await setAlbum(data);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getDuration = (duration) => {
    const minutes = parseInt(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds >= 10 ? seconds : "0" + seconds}`;
  };

  const handleAddTrack = (track, list) => {
    addTrack(track, list);
    handleClose();
  };

  useEffect(() => {
    getAlbum(params.id);
  }, [params.id]);

  useEffect(() => {
    runHolder("image-class-name");
  }, []);

  if (loading) <Loading />;
  if (error) <Error error={error} />;
  return (
    <Container fluid className="px-5 py-4 mx-0 mb-5">
      <Row className="m-0">
        <Col className="text-light text-center my-4" xs={12} lg={4}>
          {album.cover_medium ? (
            <Image className="albumImage" src={album.cover_medium} />
          ) : (
            <Image className="albumImage" src="holder.js/250x250" />
          )}
          <h2 className="mb-1">{album.title}</h2>
          {album.artist && (
            <Link className="link" to={`/artist/${album.artist.id}`}>
              <h6 className="text-grey-smaller mb-4">{album.artist.name}</h6>
            </Link>
          )}
          <Button
            className="albumPlayButton px-5 py-2"
            variant="success"
            type="button"
          >
            PLAY
          </Button>
          {album.tracks && (
            <h6 className="text-grey-smaller mt-2 mb-4">
              {`${new Date(album.release_date).getFullYear()} • ${
                album.tracks.data.length
              } SONGS`}
            </h6>
          )}
          <div className="d-flex justify-content-center align-items-center">
            <div className="px-2">
              <Heart />
            </div>
            <div className="px-2">
              <ThreeDots />
            </div>
          </div>
        </Col>
        <Col className="text-light my-4" xs={12} lg={8}>
          {album.tracks &&
            album.tracks.data.map((track, index) => (
              <div
                key={index}
                className="d-flex justify-content-between"
                onClick={() => {
                  selectedSong(track);
                }}
              >
                <div className="text-grey-smaller px-1">
                  <MusicNote />
                </div>
                <div className="px-1 w-100">
                  <div
                    style={{
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      maxWidth: "100%",
                    }}
                  >
                    {track.title} - {album.title}
                  </div>
                  <div className="text-grey-smaller">{album.artist.name}</div>
                </div>
                <div className="text-grey-smaller px-1">
                  {getDuration(track.duration)}
                </div>
                <Button
                  variant="primary-outline"
                  className="drop_down"
                  onClick={() => handleShow(track)}
                >
                  <BsThreeDotsVertical />
                </Button>
              </div>
            ))}
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add to playlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {playlists.map((list, i) => (
            <Button
              variant="success"
              key={i}
              onClick={() => handleAddTrack(track, list.title)}
            >
              {list.title}
            </Button>
          ))}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Album);
