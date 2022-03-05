import express, { Request, Response, NextFunction } from "express";

import { JWTAuthenticate } from "../auth/tools";
import { RefreshJWTAuthMiddleware } from "../auth/refreshToken";
import { UserModel } from "../../types/types.d";

const refreshTokenRouter = express.Router();

refreshTokenRouter.post(
  "/",
  RefreshJWTAuthMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = await JWTAuthenticate(req.user);
      res.send(token);
    } catch (error) {
      next(error);
    }
  }
);

export default refreshTokenRouter;
