import express from "express";
import cors from "cors";
import { testDbConnection } from "./utils/db/connect.js";
import productRouter from "./services/product/route.js";
import reviewRouter from "./services/review/route.js";

const server = express();

server.use(express.json());
server.use(cors());

server.use("/products", productRouter);
server.use("/reviews", reviewRouter);

server.listen(8080, () => {
  console.log(`✅ Server is running at port 8080`);
  testDbConnection();
});

server.on("error", (error) => console.log("❌ Server is not running ", error));
