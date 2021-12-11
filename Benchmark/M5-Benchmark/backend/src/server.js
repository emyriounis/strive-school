import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import { join } from "path";

import mediaRouter from "./services/media/index.js";

import {
  genericErrorHandler,
  badRequestHandler,
  unauthorizedHandler,
  notFoundHandler,
} from "./errorHandlers.js";

const server = express();
const port = process.env.PORT;

const publicFolderPath = join(process.cwd(), "./public");

// console.log(publicFolderPath);
server.use(express.static(publicFolderPath));

const whiteList = [process.env.FE_LOCAL_URL, process.env.FE_REMOTE_URL];

const corsOptions = {
  origin: (origin, next) => {
    if (!origin || whiteList.indexOf(origin) !== -1) {
      next(null, true);
    } else {
      next(new Error("CORS ERROR!"));
    }
  },
};

server.use(cors(corsOptions));
server.use(express.json());

server.use("/media", mediaRouter);

server.use(badRequestHandler);
server.use(unauthorizedHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);

// console.table(listEndpoints(server));

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
