import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Form, ListGroup } from "react-bootstrap";
import { io } from "socket.io-client";

const ADDRESS = "http://localhost:8080";
const socket = io(ADDRESS, { transports: ["websocket"] });

const App = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [logged, setLogged] = useState(false);
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState([]);
  const [room, setRoom] = useState(null);
  const [rooms, setRooms] = useState([]);

  const postUsername = () => {
    socket.emit("setUsername", { username: username });
  };

  const getUsers = async () => {
    try {
      const response = await fetch(ADDRESS + "/users");
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const onlineUsers = data;
        setUsers(onlineUsers);
      } else {
        console.log("error retrieving online users");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMessages = async () => {
    try {
      const response = await fetch(ADDRESS + "/messages/" + room);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setChat(data);
      } else {
        console.log("error retrieving online users");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getRooms = async () => {
    try {
      const response = await fetch(ADDRESS + "/rooms");
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setRooms(data);
      } else {
        console.log("error retrieving online users");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postMessage = () => {
    const newMessage = {
      room: room,
      text: message,
      sender: username,
      id: users.find((u) => u.username === username).id,
      timestamp: Date.now(),
    };

    socket.emit("sendMessage", newMessage);
    getMessages();
    setMessage("");
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connection is now established!");
    });

    socket.on("loggedIn", () => {
      console.log("username successfully registered! :)");
      setLogged(true);

      socket.on("newConnection", () => {
        getUsers();
      });
      socket.on("newMessage", (message) => {
        console.log("new message received!");
        console.log(message);
        getMessages();
      });
    });
  }, []);

  useEffect(() => setRoom(rooms[0]), [rooms]);

  useEffect(() => {
    getUsers();
    getRooms();
    getMessages();
  }, [logged]);

  useEffect(() => getMessages(), [room]);

  return (
    <div className="p-5">
      <Form.Control
        className="my-4"
        type="text"
        placeholder="username"
        value={username}
        disabled={logged}
        onChange={(event) => setUsername(event.target.value)}
        onKeyPress={(event) => event.key === "Enter" && postUsername()}
      />
      {logged && (
        <>
          {rooms && (
            <ListGroup className="my-4">
              {rooms.map((r, index) => (
                <ListGroup.Item
                  key={index}
                  active={r === room}
                  onClick={() => setRoom(r)}
                >
                  {r}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
          {users && (
            <ListGroup className="my-4">
              <ListGroup.Item key="users" active>
                Users:
              </ListGroup.Item>
              {users.map((user, index) => (
                <ListGroup.Item key={index}>
                  {user.username} - online
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
          {chat && (
            <ListGroup className="my-4">
              <ListGroup.Item key="chat" active>
                Chat:
              </ListGroup.Item>
              {chat.map((message, index) => (
                <ListGroup.Item key={index}>{message.text}</ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </>
      )}
      <Form.Control
        className="my-4"
        type="text"
        placeholder="message"
        value={message}
        disabled={!logged}
        onChange={(event) => setMessage(event.target.value)}
        onKeyPress={(event) => event.key === "Enter" && postMessage()}
      />
    </div>
  );
};

export default App;
