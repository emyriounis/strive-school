import { useEffect, useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { Star, StarFill } from "react-bootstrap-icons";
import Error from "./Error";
import HomeItem from "./HomeItem";
import Loading from "./Loading";

const Home = ({ filter = false }) => {
  const [files, setFiles] = useState([]);
  const [edit, setEdit] = useState(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getFiles = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/files`);
      if (response.ok) {
        const filesResponse = await response.json();
        setFiles(filesResponse);
        return filesResponse;
      } else {
        throw new Error("Fetch error!");
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => getFiles(), [filter]);

  if (loading) return <Loading />;
  if (error) return <Error />;
  return (
    <div className="m-5">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Size (kB)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {files
            .filter((file) => (filter ? file.isStarred === true : true))
            .map((file) => (
              <HomeItem key={file.id} singleFile={file} refetch={getFiles} />
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Home;
