import { useEffect, useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { Star, StarFill } from "react-bootstrap-icons";
import Error from "./Error";
import Loading from "./Loading";

const HomeItem = ({ singleFile, refetch }) => {
  const [file, setFile] = useState([]);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const patchFile = async (status) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/files/${file.id}/isStarred`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PATCH",
          body: JSON.stringify({ isStarred: status }),
        }
      );
      if (response.ok) {
        const editedFile = await response.json();
        return editedFile;
      } else {
        throw new Error("Fetch error!");
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const patchTitle = async () => {
    try {
      setLoading(true);
      setEditing(false);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/files/${file.id}/title`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PATCH",
          body: JSON.stringify({ title: file.title }),
        }
      );
      if (response.ok) {
        const editedFile = await response.json();
        return editedFile;
      } else {
        throw new Error("Fetch error!");
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
      refetch();
    }
  };

  const handleStar = async () => {
    setLoading(true);
    const updatedFile = {
      ...file,
      isStarred: !file.isStarred,
    };
    await patchFile(!file.isStarred);
    console.log(file, updatedFile);
    setFile(updatedFile);
    setLoading(false);
  };

  const deleteFile = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/files/${file.id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        const deletedFile = await response;
        return deletedFile;
      } else {
        throw new Error("Fetch error!");
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => setFile(singleFile), [singleFile]);
  useEffect(() => {
    editing === false && setFile(singleFile);
  }, [editing, singleFile]);

  if (loading) return <Loading />;
  if (error) return <Error />;
  return (
    <tr>
      <td></td>
      <td>
        {editing ? (
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="title"
              value={file.title}
              onChange={(event) =>
                setFile({ ...file, title: event.target.value })
              }
              onKeyUp={(event) => {
                event.key === "Enter" && patchTitle();
              }}
            />
          </Form.Group>
        ) : (
          file.title
        )}
      </td>
      <td>{parseInt(file.size / 1024)}</td>
      <td className="d-flex">
        <Button
          className="mx-1"
          variant="dark"
          onClick={() => (window.open(file.url), "_blank")}
        >
          See
        </Button>
        <Button
          className="mx-1"
          variant="warning"
          onClick={() => setEditing(!editing)}
        >
          {editing ? "Cancel" : "Edit"}
        </Button>
        <Button
          className="d-flex justify-content-center align-items-center mx-1"
          variant="success"
          onClick={handleStar}
        >
          {file.isStarred ? <StarFill /> : <Star />}
        </Button>
        <Button className="mx-1" variant="danger" onClick={deleteFile}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default HomeItem;
