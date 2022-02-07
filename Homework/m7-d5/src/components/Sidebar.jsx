import "../styles/Sidebar.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import {
  HouseDoorFill,
  CollectionPlayFill,
  PlusSquareFill,
  HeartFill,
  PersonCircle,
} from "react-bootstrap-icons";
import Loading from "./Loading";
import { Stack, InputGroup, FormControl, Offcanvas, Button } from "react-bootstrap";
import Error from "./Error";
import Modal from 'react-bootstrap/Modal'
import { connect } from 'react-redux'
import { addToPlayListsAction } from '../redux/actions/playlistsAction.js'

const mapDispatchToProps = dispatch => ({
  setNewPlaylist: (createPlaylist) => {
    dispatch(addToPlayListsAction(createPlaylist))
  }
})


const Sidebar = ({ show, handleClose, setNewPlaylist }) => {

  const [showCreatePlayList, setShowCreatePlayList] = useState(false);
  const handleCloseCreatePlaylist = () => setShowCreatePlayList(false);
  const handleShowCreatePlaylist = () => setShowCreatePlayList(true);
  const [createPlaylist, setCreatePlaylist] = useState("")


  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");

  const handleCreateNewPlaylist = () => {
    setNewPlaylist(createPlaylist)
    handleCloseCreatePlaylist()
  }

  const getSongs = async (query) => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`
      );
      if (!response.ok) {
        setError("failed to fetch");
      } else {
        const data = await response.json();
        setSongs(data.data);
        return data;
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (search === "") {
      setSongs([]);
    } else getSongs(search);
  }, [search]);

  if (error) <Error error={error} />;
  return (
    <>
      <Offcanvas className="offcanvas" show={show} onHide={handleClose}>
        <Offcanvas.Header className="pe-3" closeVariant="white" closeButton>
          <Offcanvas.Title>
            <Image
              src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
              alt="spotify logo"
              width="150px"
              className="p-3"
            />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <nav className="text-light p-1">
          <Stack
            className="stack d-flex flex-column justify-content-between"
            gap={1}
          >
            <div className="d-flex flex-column justify-content-start">
              <Link
                className="link d-flex align-items-center px-3 py-1"
                to="/"
                onClick={() => handleClose()}
              >
                <HouseDoorFill />
                <span className="ms-2">Home</span>
              </Link>
              <InputGroup className="d-flex align-items-center px-3 py-1">
                <FormControl
                  placeholder="Search..."
                  aria-label="Search"
                  aria-describedby="search"
                  onChange={(event) => setSearch(event.target.value)}
                />
              </InputGroup>
              <Link
                className="link d-flex align-items-center px-3 py-1"
                to="/"
                onClick={() => handleClose()}
              >
                <CollectionPlayFill />
                <span className="ms-2">Your Library</span>
              </Link>
              {/* <Link
                className="link d-flex align-items-center px-3 py-1"
                // to={`/playlists`}
                onClick={() => handleShowCreatePlaylist()}
              >
                <PlusSquareFill />
                <span className="ms-2">Create Playlist</span>
              </Link> */}
              <div
                className="link d-flex align-items-center px-3 py-1"
                onClick={handleShowCreatePlaylist}
              >
                <PlusSquareFill />
                <span className="ms-2">Create Playlist</span>
              </div>
              <Link
                className="link d-flex align-items-center px-3 py-1"
                to={`/playlists`}
                onClick={() => handleClose()}
              >
                <PlusSquareFill />
                <span className="ms-2">Playlists</span>
              </Link>

              <Link
                className="link d-flex align-items-center px-3 py-1"
                to="/liked"
                onClick={() => handleClose()}
              >
                <HeartFill />
                <span className="ms-2">Liked Songs</span>
              </Link>
              {songs.length > 0 && (
                <div className="albumsList border-secondary border-top border-bottom mx-3">
                  {songs.map((song, index) => (
                    <Link
                      key={index}
                      className="link d-flex align-items-center py-1"
                      to={`/album/${song.album.id}`}
                      onClick={() => handleClose()}
                    >
                      {song.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link
              className="link user d-flex align-items-center px-3 py-1 mb-5"
              to="/profile"
              onClick={() => handleClose()}
            >
              <PersonCircle />
              <span className="px-2">Eleftherios Myriounis</span>
            </Link>
          </Stack>
        </nav>
      </Offcanvas>
      <Modal show={showCreatePlayList} onHide={handleCloseCreatePlaylist}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <input type="text"
          value={createPlaylist}
          onChange={e => { setCreatePlaylist(e.target.value) }}
        />
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreatePlaylist}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateNewPlaylist}>
            Create playlist
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default connect(s => ({}), mapDispatchToProps)(Sidebar)
