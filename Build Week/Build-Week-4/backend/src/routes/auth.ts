import { NextFunction, Request, Response, Router } from "express";
import checkAuthMiddleware from "../auth/checkAuthMiddleware";
import loginMiddleware from "../auth/loginMiddleware";
import providerJWT from "../auth/providerJWT";
import refreshMiddleware from "../auth/refreshMiddleware";
import userModel from "../schemas/user";

const authRouter = Router();

authRouter.post(
  "/account",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, username } = req.body;

      const newUser = new userModel({
        email,
        username,
        password,
      });
      const createdUser = await newUser.save();
      console.log(createdUser);

      req.user = createdUser.toJSON();
      next();
    } catch (error) {
      next(error);
    }
  },
  providerJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send({ user: { ...req.user }, ...req.tokens });
    } catch (error) {
      next(error);
    }
  }
);

authRouter.post(
  "/session",
  loginMiddleware,
  providerJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send(req.tokens);
    } catch (error) {
      next(error);
    }
  }
);

authRouter.post(
  "/session/refresh",
  refreshMiddleware,
  providerJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send(req.tokens);
    } catch (error) {
      next(error);
    }
  }
);

authRouter.delete(
  "/session",
  checkAuthMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const loggedOutUser = await userModel.findByIdAndUpdate(req.userID, {
        refreshToken: "",
      });
      res.status(204).send();

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

export default authRouter;
