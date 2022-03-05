import cors from "cors";
import express from "express";

import serverRouter from "./routes/server";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import chatRouter from "./routes/chat";
import errorHandler from "./errorHandler";
import listEndpoints from "express-list-endpoints";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", serverRouter);
app.use("/users", authRouter);
app.use("/users", userRouter);
app.use("/chats", chatRouter);
app.use(errorHandler);
console.table(listEndpoints(app));

export default app;
