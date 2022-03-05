import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import mongoose from "mongoose";
import passport from "passport";
import cookieParser from "cookie-parser";

import blogPostsRouter from "./services/blogPosts/index.js";
import usersRouter from "./services/users/index.js";
import meRouter from "./services/me/index.js";
import loginRouter from "./services/login/index.js";
import refreshTokenRouter from "./services/register/index.js";
// import googleStrategy from "./auth/oauth.js";
import {
  badRequestHandler,
  unauthorizedHandler,
  forbiddenHandler,
  notFoundHandler,
  genericErrorHandler,
} from "./errorHandlers.js";

import googleStrategy from "./services/auth/oauth.js";

const server = express();
const port = process.env.PORT || 8080;

passport.use("google", googleStrategy);
server.use(cors({ origin: "http://localhost:3000", credentials: true }));
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

mongoose.connect(process.env.MONGO_CONNECTION);

mongoose.connection.on("connected", () => {
  console.log("Connected to Mongo!");

  server.listen(port, () => {
    // console.log(process.env.GOOGLE_OAUTH_ID);
    console.table(listEndpoints(server));
    console.log(`Server running on port ${port}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
