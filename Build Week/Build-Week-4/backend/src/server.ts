import mongoose from "mongoose";
import { Server } from "socket.io";

import { createServer } from "http";
import app from "./app";
import validatorJWT from "./auth/validatorJWT";
import { ExtendedSocket } from "./types/types";
import chatModel from "./schemas/chat";

require("dotenv").config();
const port = process.env.PORT || 8080;

const server = createServer(app);
const io = new Server(server);

io.use(async (socket: ExtendedSocket, next) => {
  if (socket.handshake.auth.accessToken) {
    try {
      const payload: any = await validatorJWT(
        socket.handshake.auth.accessToken
      );
      socket.userId = payload._id;

      next();
    } catch (error) {
      next(new Error("Credentials not valid"));
    }
  } else {
    next(new Error("Please provide credentials"));
  }
}).on("connection", async (socket: ExtendedSocket) => {
  const onlineUsers: string[] = [];
  if (socket.userId) {
    if (!onlineUsers.includes(socket.userId)) {
      onlineUsers.push(socket.userId);
      const chats = await chatModel.find(
        {
          members: { $in: [socket.userId] },
        },
        { messages: 0 }
      );

      const rooms = chats.map((chat) => chat._id.toString());
      socket.join(rooms);
    }
  }

  socket.on("sendMessage", async (message) => {
    const room = message.room;
    console.log(room);

    try {
      const updatedChat = await chatModel.findByIdAndUpdate(
        room,
        {
          $push: {
            messages: {
              sender: socket.userId,
              content: { text: message.text },
            },
          },
        },
        { new: true }
      );
      console.log(room);
      if (updatedChat) {
        const newMessage = updatedChat.messages.slice(-1)[0];
        console.log(newMessage);

        console.log(room);
        socket
          .to(room)
          .emit("newMessage", JSON.stringify({ newMessage, room }));
      }
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("disconnect", () => onlineUsers.filter((u) => u !== socket.userId));
});

mongoose.connect(process.env.MONGO_CONNECTION as string);

mongoose.connection.on("connected", () => {
  console.log("connected to DB");
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
mongoose.connection.on("error", (error) => console.log(error));
