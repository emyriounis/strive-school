import express from "express";
import { JWTAuthenticate } from "../auth/tools.js";
import { RefreshJWTAuthMiddleware } from "../auth/refreshToken.js";

const refreshTokenRouter = express.Router();

refreshTokenRouter.post(
  "/",
  RefreshJWTAuthMiddleware,
  async (req, res, next) => {
    try {
      const token = await JWTAuthenticate(req.user);
      res.send(token);
    } catch (error) {
      next(error);
    }
  }
);

export default refreshTokenRouter;
