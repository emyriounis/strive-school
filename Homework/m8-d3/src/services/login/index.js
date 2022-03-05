import express from "express";
import { JWTAuthenticate } from "../auth/tools.js";
import { basicAuthMiddleware } from "../auth/basic.js";

const loginRouter = express.Router();

loginRouter.post("/", basicAuthMiddleware, async (req, res, next) => {
  try {
    const tokens = await JWTAuthenticate(req.user);
    res.send(tokens);
  } catch (error) {
    next(error);
  }
});

export default loginRouter;
