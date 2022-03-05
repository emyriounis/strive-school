import createHttpError from "http-errors";
import atob from "atob";
import UserModel from "../users/schema.js";

export const basicAuthMiddleware = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    next(createHttpError(401, "Please provide credentials!"));
  } else {
    const email = req.body.email;
    const password = req.body.password;
    const user = await UserModel.checkCredentials(email, password);

    if (user) {
      req.user = user;
      next();
    } else {
      next(createHttpError(401, "Credentials are not ok!"));
    }
  }
};
