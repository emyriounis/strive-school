import { differenceInDays, getDay, getHours, getMinutes } from "date-fns";
import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import logoutUser from "../api/delete/logoutUser";
import meUser from "../api/get/meUser";
import myChats from "../api/get/myChats";
import searchUsers from "../api/get/searchUsers";
import refreshTokens from "../api/post/refreshTokens";
import {
  resetCredentialsAction,
  setCredentialsAction,
} from "../redux/actions/credentials";
import useWindowDimentions from "../tools/windowDimentions";
import { ChatType, StoreType, UserType } from "../types/index.d";
import newChat from "../api/post/newChat";
import { setActiveAction } from "../redux/actions/active";
import { resetNewMessageAction } from "../redux/actions/newMessage";

const Sidebar = () => {
  const { height } = useWindowDimentions();
  const { accessToken, refreshToken } = useSelector(
    (state: StoreType) => state.credentials
  );
  const active = useSelector((state: StoreType) => state.active);
  const newMessage = useSelector((state: StoreType) => state.newMessage);
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    _id: "",
    username: "",
    email: "",
    avatar: "",
  });
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<UserType[] | null>(null);
  const [chats, setChats] = useState<ChatType[] | null>(null);

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

  const getChats = async () => {
    try {
      const res = await myChats(accessToken);
      if (res) {
        setChats(
          res
            .sort((a: ChatType, b: ChatType) =>
              a.updatedAt.localeCompare(b.updatedAt)
            )
            .reverse()
        );
      }
    } catch (error: any) {
      const { status } = JSON.parse(error?.message);
      if (status === 401) {
        const tokens = await refreshTokens(refreshToken);
        await dispatch(setCredentialsAction(tokens));
        await getChats();
      }
    }
  };

  const getUsers = async () => {
    try {
      const res = await searchUsers(accessToken, search);
      if (res) {
        setSearchResult(res);
      }
    } catch (error: any) {
      const { status } = JSON.parse(error?.message);
      if (status === 401) {
        const tokens = await refreshTokens(refreshToken);
        await dispatch(setCredentialsAction(tokens));
        await getUsers();
      }
    }
  };

  const createChat = async (_id: string) => {
    try {
      const res = await newChat(accessToken, _id);
      if (res) {
        await getChats();
        setSearch("");
        dispatch(
          setActiveAction(
            chats?.find((ch) => ch.members.map((mem) => mem._id).includes(_id))
              ?._id || null
          )
        );
      }
    } catch (error: any) {
      const { status } = JSON.parse(error?.message);
      if (status === 401) {
        const tokens = await refreshTokens(refreshToken);
        await dispatch(setCredentialsAction(tokens));
        await createChat(_id);
      }
    }
  };

  const calculateTime = (time: string) => {
    if (time) {
      const date = new Date(time);
      const diff = differenceInDays(new Date(), date);

      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      return diff < 1
        ? `${getHours(date)}:${getMinutes(date)}`
        : diff < 2
        ? "Yesterday"
        : diff < 7
        ? days[getDay(date)]
        : time.slice(0, 10).split("-").slice(0, 3).reverse().join("/");
    } else {
      return "";
    }
  };

  const handleLogout = async () => {
    await logoutUser;
    dispatch(resetCredentialsAction());
  };

  useEffect(() => {
    getUser();
    getChats();
  }, []);

  useEffect(
    () => (search.length > 0 ? void getUsers() : setSearchResult(null)),
    [search]
  );

  useEffect(
    () =>
      void (
        chats &&
        chats?.length > 0 &&
        !active &&
        dispatch(setActiveAction(chats[0]._id))
      ),
    [chats, active]
  );

  return (
    <Container
      fluid
      className="border-end px-0"
      style={{ height, overflow: "auto" }}
    >
      <Row
        className="d-flex justify-content-between align-items-center p-3 mx-0"
        style={{ background: "#ddd", flexWrap: "nowrap" }}
      >
        <Image
          className="px-0"
          src={user.avatar}
          style={{
            width: "40px",
            height: "40px",
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
        <Button
          variant="outline-danger"
          style={{ width: "auto" }}
          onClick={handleLogout}
        >
          Log out
        </Button>
      </Row>
      <Row className="d-flex justify-content-between align-items-center border-bottom p-3 mx-0">
        <Form.Group className="px-0">
          <Form.Control
            type="text"
            size="sm"
            placeholder="Search or start a new chat"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </Form.Group>
        {searchResult && (
          <ListGroup className="px-0 mt-2">
            {searchResult
              .filter((u) => u._id !== user._id)
              .map((u) => (
                <ListGroup.Item key={u._id} onClick={() => createChat(u._id)}>
                  {u.username}
                </ListGroup.Item>
              ))}
          </ListGroup>
        )}
      </Row>
      {chats ? (
        chats.map((chat) => (
          <Row
            key={chat._id}
            className="d-flex justify-content-between align-items-center border-bottom p-3 mx-0 w-auto"
            style={
              chat._id === active
                ? {
                    background: "#eee",
                  }
                : {}
            }
            onClick={() => {
              dispatch(setActiveAction(chat._id));
              dispatch(resetNewMessageAction(chat._id));
            }}
          >
            <Col xs="auto" className="px-0">
              <Image
                className="px-0"
                src={
                  chat.members
                    .filter((mem) => mem._id !== user._id)
                    .map((mem) => mem.avatar)[0]
                }
                style={{
                  width: "48px",
                  height: "48px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            </Col>
            <Col className="ps-4">
              <Row className="d-flex justify-content-between align-items-center">
                <Col className="fw-bold px-0">
                  {chat.members
                    .filter((mem) => mem._id !== user._id)
                    .map((mem) => mem.username)
                    .join(", ")}
                </Col>
                <Col xs="auto" className="text-secondary small px-0">
                  {chat._id !== active && newMessage.includes(chat._id) ? (
                    <span style={{ color: "#f00" }}>Now</span>
                  ) : (
                    calculateTime(chat.updatedAt)
                  )}
                </Col>
              </Row>
              <Row className="text-secondary small">
                {chat.messages && chat.messages.length > 0
                  ? chat.messages[chat.messages.length - 1].content.text
                  : "No messages yet"}
              </Row>
            </Col>
          </Row>
        ))
      ) : (
        <Row className="justify-content-center fw-bold mt-5 mx-0 w-100">
          No chats
        </Row>
      )}
    </Container>
  );
};

export default Sidebar;
