import express from "express";
import listEndpoints from "express-list-endpoints";

import authorsRouter from "./services/authors/index.js";

const server = express();
const port = 8080;
server.use(express.json());

server.use("/authors", authorsRouter);

console.table(listEndpoints(server));

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// import express from "express";
// const app = express();
// const port = 8080;

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });
