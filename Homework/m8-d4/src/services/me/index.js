import BlogPostsModel from "../blogPosts/schema.js";
import q2m from "query-to-mongo";
import express from "express";
import { basicAuthMiddleware } from "../auth/basic.js";

const meRouter = express.Router();

meRouter.get("/stories", basicAuthMiddleware, async (req, res, next) => {
  try {
    const blogPosts = await BlogPostsModel.find({
      authors: req.user._id,
    }).populate("authors");
    res.send(blogPosts);
  } catch (error) {
    next(error);
  }
});

export default meRouter;
