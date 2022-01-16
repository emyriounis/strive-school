import express from "express";
import productRouter from "./services/product/route.js";
import reviewRouter from "./services/review/route.js";
import cors from "cors";
import sequelize, { testDB } from "./db/index.js";
const server = express();

server.use(express.json());
server.use(cors());

server.use("/products", productRouter);
server.use("/reviews", reviewRouter);

server.listen(8080, async () => {
  console.log(`✅ Server is running at port 8080`);
  await testDB();
  await sequelize.sync();
});

server.on("error", (error) => console.log("❌ Server is not running ", error));
