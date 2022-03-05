import createHttpError from "http-errors";
import { verifyJWT } from "./tools.js";

export const JWTAuthMiddleware = async (req, res, next) => {
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
      const payload = await verifyJWT(token);

      req.user = {
        _id: payload._id,
        // role: payload.role,
      };
      next();
    } catch (error) {
      console.log(error);
      next(createHttpError(401, "Token not valid!"));
    }
  }
};
