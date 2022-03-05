import { userInfo } from "os";
import { useEffect, useRef, useState } from "react";
import { Col, Container, Form, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import meUser from "../api/get/meUser";
import singleChat from "../api/get/singleChat";
import refreshTokens from "../api/post/refreshTokens";
import { setCredentialsAction } from "../redux/actions/credentials";
import { setNewMessageAction } from "../redux/actions/newMessage";
import useWindowDimentions from "../tools/windowDimentions";
import { ChatType, StoreType } from "../types/index.d";

const Main = () => {
  const { height } = useWindowDimentions();

  const [chat, setChat] = useState<ChatType | null>(null);
  const [message, setMessage] = useState("");

  const [user, setUser] = useState({
    _id: "",
    username: "",
    email: "",
    avatar: "",
  });
  const chatDiv: any = useRef(null);

  const active = useSelector((state: StoreType) => state.active);
  const { accessToken, refreshToken } = useSelector(
    (state: StoreType) => state.credentials
  );
  const dispatch = useDispatch();

  const ADDRESS = process.env.REACT_APP_API_URL;
  const socket = io(ADDRESS || "", {
    transports: ["websocket"],
    auth: { accessToken },
  });

  const getUser = async () => {
    try {
      const res = await meUser(accessToken);
      if (res) {
        setUser(res);
      }
    } catch (error: any) {
      const { status } = JSON.parse(error?.message);
      if (status === 401) {
        const tokens = await refreshTokens(refreshToken);
        await dispatch(setCredentialsAction(tokens));
        setTimeout(async () => await getUser(), 1000);
      }
    }
  };

  const getChat = async () => {
    try {
      if (active) {
        const res = await singleChat(accessToken, active);
        if (res) {
          setChat(res);
        }
      } else {
        throw new Error("no chat selected");
      }
    } catch (error: any) {
      const { status } = JSON.parse(error?.message);
      if (status === 401) {
        const tokens = await refreshTokens(refreshToken);
        await dispatch(setCredentialsAction(tokens));
        await getChat();
      }
    }
  };

  const postMessage = () => {
    const newMessage = {
      room: active,
      text: message,
    };

    socket.emit("sendMessage", newMessage);
    setMessage("");
  };

  const scrollToBottom = () =>
    chatDiv &&
    chatDiv.current &&
    (chatDiv.current.scrollTop = chatDiv.current.scrollHeight);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    socket.on("newMessage", (message) => {
      const { newMessage, room } = JSON.parse(message);
      console.log(newMessage, room);

      if (room === active) {
        chat?.messages &&
          newMessage &&
          setChat({ ...chat, messages: [...chat.messages, newMessage] });
      } else if (typeof room === "string") {
        dispatch(setNewMessageAction(room));
      }
    });
    scrollToBottom();
  }, [chat]);

  useEffect(() => void (active && getChat()), [active]);

  useEffect(() => void (message === "\n" && setMessage("")), [message]);

  return active && chat ? (
    <Container
      fluid
      className=" border-end px-0"
      style={{ height, overflow: "hidden" }}
    >
      <Row
        className="d-flex justify-content-between align-items-center p-3 mx-0"
        style={{ background: "#eee", flexWrap: "nowrap" }}
      >
        <Image
          className="px-0"
          src={chat.members.find((mem) => mem._id !== user._id)?.avatar}
          style={{
            width: "40px",
            height: "40px",
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
        <Col className="fw-bold">
          {chat.members.find((mem) => mem._id !== user._id)?.username}
        </Col>
      </Row>
      {chat.messages && chat.messages.length > 0 ? (
        <Row
          ref={chatDiv}
          className="align-items-end py-3 px-4 mx-0"
          style={{ height: height - 142, overflowY: "scroll" }}
        >
          {chat.messages.map((message) => {
            const mine = message.sender === user._id;
            return (
              <Col key={message._id} xs={12}>
                <div
                  className={`small p-3 my-2 ${mine ? "ms-auto" : ""}`}
                  style={{
                    width: "fit-content",
                    maxWidth: "70%",
                    background: mine ? "#afa" : "#eee",
                    borderRadius: "10px",
                  }}
                >
                  {message.content.text}
                </div>
              </Col>
            );
          })}
        </Row>
      ) : (
        <Row
          className="justify-content-center align-items-center fw-bold mx-0 w-100"
          style={{ height }}
        >
          {`This is the begging of your conversation with ${
            chat.members.find((mem) => mem._id !== user._id)?.username
          }`}
        </Row>
      )}
      <Row className="py-1 px-3 mx-0" style={{ background: "#ddd" }}>
        <Form.Group className="px-0">
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Type a message"
            value={message}
            onKeyPress={(event) =>
              event.key === "Enter" && message.length > 0 && postMessage()
            }
            onChange={(event) => setMessage(event.target.value)}
          />
        </Form.Group>
      </Row>
    </Container>
  ) : (
    <Container fluid className="border-end px-0">
      <Row
        className="justify-content-center align-items-center fw-bold mx-0 w-100"
        style={{ height }}
      >
        No chat selected
      </Row>
    </Container>
  );
};

export default Main;
