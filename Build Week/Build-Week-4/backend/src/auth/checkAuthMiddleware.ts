import createHttpError from "http-errors";
import validatorJWT from "./validatorJWT";
import { Request, Response, NextFunction } from "express";

const checkAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    next(createHttpError(400, "Please provide authorization token"));
  } else {
    try {
      const token = req.headers.authorization.replace("Bearer ", "");
      const payload: any = await validatorJWT(token);

      req.userID = payload._id;
      next();
    } catch (error) {
      console.log(error);
      next(createHttpError(401, "Token not valid!"));
    }
  }
};

export default checkAuthMiddleware;
