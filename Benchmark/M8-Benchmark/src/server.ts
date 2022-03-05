import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import mongoose from "mongoose";
import passport from "passport";
import cookieParser from "cookie-parser";

import blogPostsRouter from "./services/blogPosts/index";
import usersRouter from "./services/users/index";
import meRouter from "./services/me/index";
import loginRouter from "./services/login/index";
import refreshTokenRouter from "./services/register/index";
// import googleStrategy from "./auth/oauth";
import {
  badRequestHandler,
  unauthorizedHandler,
  forbiddenHandler,
  notFoundHandler,
  genericErrorHandler,
} from "./errorHandlers";

// import googleStrategy from "./services/auth/oauth";
require("dotenv").config();
const server = express();
const port = (process.env.PORT as string) || 8080;

// passport.use("google", googleStrategy);
server.use(cors({ origin: process.env.FE_URL, credentials: true }));
server.use(cookieParser());
server.use(express.json());
server.use(passport.initialize());

server.use("/blogPosts", blogPostsRouter);
server.use("/users", usersRouter);
server.use("/me", meRouter);
server.use("/login", loginRouter);
server.use("/refreshToken", refreshTokenRouter);

server.use(badRequestHandler);
server.use(unauthorizedHandler);
server.use(forbiddenHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);

export default server;
// mongoose.connect(process.env.MONGO_CONNECTION as string);

// mongoose.connection.on("connected", () => {
//   console.log("Connected to Mongo!");

//   server.listen(port, () => {
//     // console.log(process.env.GOOGLE_OAUTH_ID);
//     console.table(listEndpoints(server));
//     console.log(`Server running on port ${port}`);
//   });
// });

// mongoose.connection.on("error", (err) => {
//   console.log(err);
// });
