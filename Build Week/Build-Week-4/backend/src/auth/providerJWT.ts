import createHttpError from "http-errors";
import { Request, Response, NextFunction } from "express";
import generatorJWT from "./generatorJWT";
import userModel from "../schemas/user";

const providerJWT = async (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user;

  try {
    if (_id) {
      const accessToken = await generatorJWT(_id, "15m");
      const refreshToken = await generatorJWT(_id, "2w");

      if (typeof accessToken === "string" && typeof refreshToken === "string") {
        const user = await userModel.findById(_id);
        if (user) {
          user.refreshToken = refreshToken;
          await user.save();
          req.tokens = { accessToken, refreshToken };
          next();
        } else {
          next(createHttpError(404, "User not found"));
        }
      } else {
        next(createHttpError(500, "Failed to generate JWT tokens"));
      }
    } else {
      next(createHttpError(404, "User not found"));
    }
  } catch (error) {
    next(error);
  }
};

export default providerJWT;
