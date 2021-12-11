import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";

import authorsRouter from "./services/authors/index.js";
import blogPosts from "./services/blogPosts/index.js";

import {
  genericErrorHandler,
  badRequestHandler,
  unauthorizedHandler,
  notFoundHandler,
} from "./errorHandlers.js";

const server = express();
const port = 8080;
server.use(cors());
server.use(express.json());

server.use("/authors", authorsRouter);
server.use("/blogPosts", blogPosts);

server.use(badRequestHandler);
server.use(unauthorizedHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);

// console.table(listEndpoints(server));

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
