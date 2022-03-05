import BlogPostsModel from "../blogPosts/schema";
// import q2m from "query-to-mongo";
import express, { NextFunction, Request, Response } from "express";
import { basicAuthMiddleware } from "../auth/basic";

const meRouter = express.Router();

meRouter.get(
  "/stories",
  basicAuthMiddleware,
  async (req: Request | any, res: Response, next: NextFunction) => {
    try {
      const blogPosts = await BlogPostsModel.find({
        authors: req.user._id,
      }).populate("authors");
      res.send(blogPosts);
    } catch (error) {
      next(error);
    }
  }
);

export default meRouter;
