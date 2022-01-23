import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";
import profileRouter from "./services/profile/index.js";
import {
  badRequestHandler,
  notFoundHandler,
  conflictHandler,
  genericErrorHandler,
} from "./errorHandlers.js";
import ExperienceRouter from "./services/experience/experience.js";
import postRouter from "./services/posts/index.js";

const server = express();

server.use(express.json());
server.use(cors());

//  ============= END Points ===================
server.get("/", (req, res) => res.send("Hello"));
server.use("/posts", postRouter);
server.use("/profile", profileRouter);
server.use("/profile", ExperienceRouter);

//  ========  Errors Handlers ================

server.use(badRequestHandler);
server.use(notFoundHandler);
server.use(conflictHandler);
server.use(genericErrorHandler);

//  ========= Connection section =============
mongoose.connect(process.env.MONGO_CONNECTION);

mongoose.connection.on("connected", () => {
  console.log("Connected to Mongo!");

  server.listen(process.env.PORT || 8080, () => {
    console.table(listEndpoints(server));
    console.log(`Server running on port ${process.env.PORT || 8080}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
