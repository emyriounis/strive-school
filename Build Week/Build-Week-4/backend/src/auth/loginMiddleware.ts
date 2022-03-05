import createHttpError from "http-errors";
import userModel from "../schemas/user";
import { Request, Response, NextFunction } from "express";

const loginMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.identifier && req.body.password) {
    const identifier = req.body.identifier;
    const password = req.body.password;
    const user = await userModel.authenticate(identifier, password);

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

export default loginMiddleware;
