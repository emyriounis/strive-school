import { useEffect, useState } from "react";
import { Container, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";

interface TrackType {
  id: number;
  title: string;
  artist: {
    name: string;
  };
  album: {
    title: string;
  };
}

const Details = () => {
  const { trackID } = useParams();
  const [track, setTrack] = useState<TrackType | null>(null);

  const getTrack = async () => {
    try {
      const resp = await fetch(
        `https://striveschool-api.herokuapp.com/api/deezer/track/${trackID}`
      );
      if (resp.ok) {
        const data = await resp.json();
        setTrack({
          id: data.id,
          title: data.title,
          artist: { name: data.artist?.name },
          album: { title: data.album?.title },
        });
      } else {
        console.log(resp);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => void getTrack(), [trackID]);

  return (
    <Container fluid className="m-5">
      <ListGroup>
        <ListGroup.Item>id: {track?.id}</ListGroup.Item>
        <ListGroup.Item>title: {track?.title}</ListGroup.Item>
        <ListGroup.Item>artist: {track?.artist.name}</ListGroup.Item>
        <ListGroup.Item>album: {track?.album.title}</ListGroup.Item>
      </ListGroup>
    </Container>
  );
};

export default Details;
