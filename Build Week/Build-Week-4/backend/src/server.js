"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const app_1 = __importDefault(require("./app"));
const validatorJWT_1 = __importDefault(require("./auth/validatorJWT"));
const chat_1 = __importDefault(require("./schemas/chat"));
require("dotenv").config();
const port = process.env.PORT || 8080;
const server = (0, http_1.createServer)(app_1.default);
const io = new socket_io_1.Server(server);
io.use((socket, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (socket.handshake.auth.accessToken) {
        try {
            const payload = yield (0, validatorJWT_1.default)(socket.handshake.auth.accessToken);
            socket.userId = payload._id;
            next();
        }
        catch (error) {
            next(new Error("Credentials not valid"));
        }
    }
    else {
        next(new Error("Please provide credentials"));
    }
})).on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
    const onlineUsers = [];
    if (socket.userId) {
        if (!onlineUsers.includes(socket.userId)) {
            onlineUsers.push(socket.userId);
            const chats = yield chat_1.default.find({
                members: { $in: [socket.userId] },
            }, { messages: 0 });
            const rooms = chats.map((chat) => chat._id.toString());
            socket.join(rooms);
        }
    }
    socket.on("sendMessage", (message) => __awaiter(void 0, void 0, void 0, function* () {
        const room = message.room;
        console.log(room);
        try {
            const updatedChat = yield chat_1.default.findByIdAndUpdate(room, {
                $push: {
                    messages: {
                        sender: socket.userId,
                        content: { text: message.text },
                    },
                },
            }, { new: true });
            console.log(room);
            if (updatedChat) {
                const newMessage = updatedChat.messages.slice(-1)[0];
                console.log(newMessage);
                console.log(room);
                socket
                    .to(room)
                    .emit("newMessage", JSON.stringify({ newMessage, room }));
            }
        }
        catch (error) {
            console.log(error);
        }
    }));
    socket.on("disconnect", () => onlineUsers.filter((u) => u !== socket.userId));
}));
mongoose_1.default.connect(process.env.MONGO_CONNECTION);
mongoose_1.default.connection.on("connected", () => {
    console.log("connected to DB");
    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
mongoose_1.default.connection.on("error", (error) => console.log(error));
