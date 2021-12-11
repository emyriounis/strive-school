import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Error from "./Error";
import Loading from "./Loading";

const NewMedia = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [newMediaData, setNewMediaData] = useState({
    title: "",
    year: "",
    imdbID: "",
    type: "",
  });
  const [file, setFile] = useState({});

  const uploadMedia = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/media`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(newMediaData),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch");
      } else {
        const newMedia = await response.json();
        const newPoster = await uploadPoster(newMedia.id);
        return newPoster;
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const uploadPoster = async (id) => {
    try {
      setLoading(true);
      const fileData = new FormData();
      fileData.append("poster", file);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/media/${id}/poster`,
        {
          method: "POST",
          body: fileData,
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to fetch");
      } else {
        const poster = await response.json();
        return poster;
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  return (
    <Form className="text-light px-5">
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          value={newMediaData.title}
          onChange={(event) =>
            setNewMediaData({ ...newMediaData, title: event.target.value })
          }
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Year</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter year"
          value={newMediaData.year}
          onChange={(event) =>
            setNewMediaData({ ...newMediaData, year: event.target.value })
          }
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>imdbID</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          value={newMediaData.imdbID}
          onChange={(event) =>
            setNewMediaData({ ...newMediaData, imdbID: event.target.value })
          }
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Type</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter type"
          value={newMediaData.type}
          onChange={(event) =>
            setNewMediaData({ ...newMediaData, type: event.target.value })
          }
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Poster</Form.Label>
        <Form.Control
          type="file"
          onChange={(event) => setFile(event.target.files[0])}
        />
      </Form.Group>
      <Button
        className="mb-3"
        variant="primary"
        type="button"
        onClick={uploadMedia}
      >
        Add Media
      </Button>
    </Form>
  );
};

export default NewMedia;
