import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import productsRouter from "./products/index.js";
import reviewsRouter from "./reviews/index.js";
import { notFound, forbidden, catchAllErrorHandler } from "./errorHandlers.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDirectory = path.join(__dirname, "../public");

const server = express();
const PORT = 3001;
server.use(cors());
server.use(express.json());
server.use(express.static(publicDirectory));

server.use("/products", productsRouter);
server.use("/reviews", reviewsRouter);

server.use(notFound);
server.use(forbidden);
server.use(catchAllErrorHandler);

console.table(listEndpoints(server));

server.listen(PORT, () => console.log("✅ Server is running on port : ", PORT));
server.on("error", (error) =>
  console.log(`❌ Server is not running due to : ${error}`)
);
