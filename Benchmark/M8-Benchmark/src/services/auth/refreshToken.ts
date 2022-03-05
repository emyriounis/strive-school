import createHttpError from "http-errors";
import { verifyJWT } from "./tools";
import UserModel from "../users/schema";
import { Request, Response, NextFunction } from "express";
import { PayloadUserId, UserDocument } from "../../types/types.d";

export const RefreshJWTAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    next(
      createHttpError(
        401,
        "Please provide bearer token in authorization header!"
      )
    );
  } else {
    try {
      const token = req.headers.authorization.replace("Bearer ", "");

      const payload: any = await verifyJWT(token); // any type!!!!!
      const user = await UserModel.findById(payload._id);

      if (!user) {
        next(createHttpError(404, "User not found"));
      } else if (user.refreshToken && user.refreshToken === token) {
        req.user = user;
        next();
      } else {
        next(createHttpError(401, "Credentials are not ok!"));
      }
    } catch (error) {
      console.log(error);
      next(createHttpError(401, "Token not valid!"));
    }
  }
};
