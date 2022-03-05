import express, { Request, Response, NextFunction } from "express";

import passport from "passport";
import { JWTAuthenticate } from "../auth/tools";
import { basicAuthMiddleware } from "../auth/basic";

const loginRouter = express.Router();

loginRouter.post("/", basicAuthMiddleware, async (req, res, next) => {
  try {
    const tokens = await JWTAuthenticate(req.user);
    res.send(tokens);
  } catch (error) {
    next(error);
  }
});

loginRouter.get(
  "/googleLogin",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

loginRouter.get(
  "/googleRedirect",
  passport.authenticate("google"),
  async (req: Request | any, res: Response, next: NextFunction) => {
    try {
      console.log("TOKENS: ", req.user.tokens);

      res.cookie("accessToken", req.user.tokens.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
        sameSite: "strict",
      });
      res.cookie("refreshToken", req.user.tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
        sameSite: "strict",
      });

      res.redirect(`${process.env.FE_URL}`);
    } catch (error) {
      next(error);
    }
  }
);

export default loginRouter;
