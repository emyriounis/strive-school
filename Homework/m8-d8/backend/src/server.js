import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const server = express();
server.use(cors());
server.use(express.json());
const httpServer = createServer(server);
const io = new Server(httpServer);
let onlineUsers = [];
let messages = [];
let rooms = ["first", "second"];

server.get("/", (req, res) => {
  res.send("Server is running");
});

server.get("/users", (req, res) => {
  res.send(onlineUsers);
});

server.get("/messages/:room", (req, res) => {
  console.log(req.params.room);
  res.send(messages.filter((mess) => mess.room === req.params.room));
});

server.get("/rooms", (req, res) => {
  res.send(rooms);
});

io.on("connection", (socket) => {
  console.log("id", socket.id);

  socket.on("setUsername", ({ username }) => {
    console.log("username", username);

    //   socket.join(room);

    onlineUsers.push({ username, id: socket.id });
    console.log(onlineUsers);

    socket.emit("loggedIn");
    socket.broadcast.emit("newConnection");
  });

  socket.on("sendMessage", async (data) => {
    console.log(data);
    messages.push(data);
    socket.broadcast.emit("newMessage");
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((u) => u.id !== socket.id);
  });
});

httpServer.listen(8080, () => {
  console.log("Server listening on port " + 8080);
});
