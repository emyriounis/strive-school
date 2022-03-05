import { NextFunction, Request, Response, Router } from "express";
import createHttpError from "http-errors";
import checkAuthMiddleware from "../auth/checkAuthMiddleware";
import userModel from "../schemas/user";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinaryOptions } from "../types/types";

require("dotenv").config();
const userRouter = Router();

const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});
const multerOpts: cloudinaryOptions = {
  cloudinary: cloudinary,
  params: {
    folder: "whatsapp-avatars",
  },
};

const storage = new CloudinaryStorage(multerOpts);
const avatarUpload = multer({ storage }).single("avatar");

userRouter.get(
  "/",
  checkAuthMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { search } = req.query;
      const query = search
        ? {
            $or: [
              { email: { $regex: search } },
              { username: { $regex: search } },
            ],
          }
        : {};

      // const query =
      const users = await userModel.find(query).limit(5);

      res.send(users);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.get(
  "/me",
  checkAuthMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userModel.findById(req.userID);

      if (user) {
        res.send(user);
      } else {
        next(createHttpError(404, "Not found"));
      }
    } catch (error) {
      next(error);
    }
  }
);

userRouter.put(
  "/me",
  checkAuthMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedUser = await userModel.findByIdAndUpdate(
        req.userID,
        req.body
      );

      if (updatedUser) {
        res.status(204).send();
      } else {
        next(createHttpError(404, "Not found"));
      }
    } catch (error) {
      next(error);
    }
  }
);

userRouter.post(
  "/me/avatar",
  checkAuthMiddleware,
  avatarUpload,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.file) {
        const updatedUser = await userModel.findByIdAndUpdate(req.userID, {
          avatar: req.file.path,
        });

        if (updatedUser) {
          res.status(204).send();
        } else {
          next(createHttpError(404, "Not found"));
        }
      } else {
        next(createHttpError(400, "No avatar provided"));
      }
    } catch (error) {
      next(createHttpError(400, "bad request"));

      next(error);
    }
  }
);

userRouter.get(
  "/:userId",
  checkAuthMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userModel.findById(req.params.userId);
      console.log(user);

      if (user) {
        res.send(user);
      } else {
        next(createHttpError(404, "Not found"));
      }
    } catch (error) {
      next(createHttpError(400, "Invalid ID supplied"));
    }
  }
);

export default userRouter;
