import express from "express";
import productRouter from "./services/product/index.js";
import reviewRouter from "./services/review/index.js";
// import userRouter from "./services/user/route.js";
// import categoryRouter from "./services/category/route.js";
import cartRouter from "./services/cart/index.js";
import cors from "cors";
// import sequelize, { testDB } from "./db/index.js";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";
import {
  badRequestHandler,
  notFoundHandler,
  genericErrorHandler,
} from "./errorHandlers.js";
const server = express();

server.use(express.json());
server.use(cors());
const port = 8080;

server.use("/products", productRouter);
server.use("/reviews", reviewRouter);
// server.use("/users", userRouter);
// server.use("/categories", categoryRouter);
server.use("/cart", cartRouter);

server.use(badRequestHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);

// server.listen(process.env.PORT || 8080, async () => {
//   console.log(`✅ Server is running at port 8080`);
//   await testDB();
//   await sequelize.sync({ alert: true });
// });

// server.on("error", (error) => console.log("❌ Server is not running ", error));

mongoose.connect(process.env.MONGO_CONNECTION);

mongoose.connection.on("connected", () => {
  console.log("Connected to Mongo!");

  server.listen(port, () => {
    console.table(listEndpoints(server));
    console.log(`Server running on port ${port}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
