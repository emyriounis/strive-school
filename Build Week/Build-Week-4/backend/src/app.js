"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const server_1 = __importDefault(require("./routes/server"));
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const chat_1 = __importDefault(require("./routes/chat"));
const errorHandler_1 = __importDefault(require("./errorHandler"));
const express_list_endpoints_1 = __importDefault(require("express-list-endpoints"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/", server_1.default);
app.use("/users", auth_1.default);
app.use("/users", user_1.default);
app.use("/chats", chat_1.default);
app.use(errorHandler_1.default);
console.table((0, express_list_endpoints_1.default)(app));
exports.default = app;
