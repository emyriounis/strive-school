import createHttpError from "http-errors";
import userModel from "../schemas/user";
import { Request, Response, NextFunction } from "express";

const refreshMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = req.headers.authorization?.replace("Bearer ", "");
  if (refreshToken) {
    console.log({ refreshToken });

    const user = await userModel.findOne({ refreshToken });
    console.log({ user });

    if (user) {
      req.user = user.toJSON();
      next();
    } else {
      next(createHttpError(401, "Credentials are not ok!"));
    }
  } else {
    next(createHttpError(401, "Please provide credentials!"));
  }
};

export default refreshMiddleware;
