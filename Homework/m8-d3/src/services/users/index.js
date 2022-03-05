import express from "express";
import createHttpError from "http-errors";
import UsersModel from "./schema.js";
import BlogPostModel from "../blogPosts/schema.js";
import q2m from "query-to-mongo";
import { JWTAuthMiddleware } from "../auth/token.js";

const usersRouter = express.Router();

usersRouter.post("/", async (req, res, next) => {
  try {
    const newUser = new UsersModel(req.body);
    const createdUser = await newUser.save();

    res.status(201).send(createdUser);
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/", JWTAuthMiddleware, async (req, res, next) => {
  try {
    const users = await UsersModel.find().populate("posts");
    const modifiedUsers = users.map((user) => {
      return { ...user.toObject(), isAuthor: user.posts.length > 0 };
    });
    res.send(modifiedUsers);
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/:userID", JWTAuthMiddleware, async (req, res, next) => {
  try {
    const userID = req.params.userID;
    const user = await UsersModel.findById(userID).populate("posts");
    if (user) {
      const userBlogPosts = await BlogPostModel.find({ authors: user._id });
      const isAuthor = userBlogPosts.length > 0;
      res.send({ ...user.toObject(), isAuthor });
    } else {
      next(createHttpError(404, `User with id ${userID} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.put("/:userID", JWTAuthMiddleware, async (req, res, next) => {
  try {
    const userID = req.params.userID;
    const updatedUser = await UsersModel.findByIdAndUpdate(userID, req.body, {
      new: true,
    });
    if (updatedUser) {
      res.send(updatedUser);
    } else {
      next(createHttpError(404, `User with id ${userID} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.delete("/:userID", JWTAuthMiddleware, async (req, res, next) => {
  try {
    const userID = req.params.userID;
    const deletedUser = await UsersModel.findByIdAndDelete(userID);
    if (deletedUser) {
      res.status(204).send();
    } else {
      next(createHttpError(404, `User with id ${userID} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
