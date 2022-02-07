import { title } from "process";
import { ChangeEvent, useEffect, useState } from "react";
import {
  Alert,
  Container,
  Form,
  FormControl,
  ListGroup,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";

interface MusicType {
  id: number;
  title: string;
  artist: {
    name: string;
  };
  album: {
    title: string;
  };
}

const Home = () => {
  const [search, setSearch] = useState("");
  const [music, setMusic] = useState<MusicType[]>([]);

  const getMusic = async () => {
    try {
      const resp = await fetch(
        `https://striveschool-api.herokuapp.com/api/deezer/search?q=${search}`
      );
      if (resp.ok) {
        const { data } = await resp.json();
        setMusic(data);
      } else {
        console.log(resp);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(
    () => (search.length > 0 ? void getMusic() : setMusic([])),
    [search]
  );

  return (
    <Container fluid className="p-5">
      <Row>
        <Form>
          <FormControl
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(
              event
              // : ChangeEvent<HTMLInputElement>
            ) => setSearch(event.target.value)}
          />
        </Form>
      </Row>
      <Row className="p-3 my-5">
        {music.length > 0 ? (
          <ListGroup>
            {music.map((track) => (
              <ListGroup.Item key={track.id}>
                <Link
                  to={`/${track.id}`}
                >{`${track.title} by ${track.artist.name} from ${track.album.title}`}</Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <Alert variant="warning">No tracks found</Alert>
        )}
      </Row>
    </Container>
  );
};

export default Home;
