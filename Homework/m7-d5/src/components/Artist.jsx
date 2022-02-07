import "../styles/Home.css";
import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Stack } from "react-bootstrap";
import { useParams } from "react-router";
import SingleAlbum from "./SingleAlbum";
import Error from "./Error";
import { ThreeDots } from "react-bootstrap-icons";

const Artist = () => {
  const { id } = useParams();

  const [songs, setSongs] = useState([]);
  const [artist, setArtist] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getArtist = async (artistID) => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistID}`
      );
      if (!response.ok) {
        setError("failed to fetch");
      } else {
        const data = await response.json();
        setArtist(data);
        return data;
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getArtist(id);
  }, []);

  const getSongs = async (artistID) => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistID}/top?limit=50`
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
    getSongs(id);
  }, []);

  if (error) <Error error={error} />;
  return (
    <div className="px-5 py-4 mb-5">
      <Stack className="text-center text-light" gap={3}>
        {artist.nb_fan && (
          <h6 className="text-grey-smaller">
            {artist.nb_fan} MONTHLY LISTENERS
          </h6>
        )}
        {artist.name && (
          <h2 className="categoryTitle">{artist.name.toUpperCase()}</h2>
        )}
        <Stack
          className="d-flex justify-content-center"
          direction="horizontal"
          gap={3}
        >
          <Button
            className="albumPlayButton px-5 py-2"
            variant="success"
            type="button"
          >
            PLAY
          </Button>
          <Button
            className="albumPlayButton px-5 py-2"
            variant="outline-light"
            type="button"
          >
            FOLLOW
          </Button>
          <ThreeDots size={24} />
        </Stack>
      </Stack>
      <h4 className="categoryTitle text-light my-3">Albums</h4>
      <Container fluid className="p-0 mb-5">
        <Row className="d-flex g-2" xs={1} sm={2} md={3} lg={4} xl={6}>
          {songs.slice(0, 12).map((song) => (
            <Col key={song.id} className="p-2">
              <SingleAlbum
                id={song.album.id}
                cover={song.album.cover_medium}
                title={song.title_short}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Artist;
