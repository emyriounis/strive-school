import express from "express";
import productRouter from "./services/product/route.js";
import reviewRouter from "./services/review/route.js";
import userRouter from "./services/user/route.js";
import categoryRouter from "./services/category/route.js";
import cartRouter from "./services/cart/route.js";
import cors from "cors";
import sequelize, { testDB } from "./db/index.js";
const server = express();

server.use(express.json());
server.use(cors());

server.use("/products", productRouter);
server.use("/reviews", reviewRouter);
server.use("/users", userRouter);
server.use("/categories", categoryRouter);
server.use("/cart", cartRouter);

server.listen(process.env.PORT || 8080, async () => {
  console.log(`✅ Server is running at port 8080`);
  await testDB();
  await sequelize.sync({ alert: true });
});

server.on("error", (error) => console.log("❌ Server is not running ", error));
