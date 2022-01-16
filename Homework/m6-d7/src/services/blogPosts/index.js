import express from "express";
import createHttpError from "http-errors";
import BlogPostsModel from "./schema.js";

const blogPostsRouter = express.Router();

blogPostsRouter.post("/", async (req, res, next) => {
  try {
    const newBlogPost = new BlogPostsModel(req.body);
    const createdBlogPost = await newBlogPost.save();

    res.status(201).send(createdBlogPost);
  } catch (error) {
    next(error);
  }
});

blogPostsRouter.get("/", async (req, res, next) => {
  try {
    const blogPosts = await BlogPostsModel.find();
    res.send(blogPosts);
  } catch (error) {
    next(error);
  }
});

blogPostsRouter.get("/:blogPostID", async (req, res, next) => {
  try {
    const blogPostID = req.params.blogPostID;

    const blogPost = await BlogPostsModel.findById(blogPostID);
    if (blogPost) {
      res.send(blogPost);
    } else {
      next(createHttpError(404, `BlogPost with id ${blogPostID} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

blogPostsRouter.put("/:blogPostID", async (req, res, next) => {
  try {
    const blogPostID = req.params.blogPostID;
    const updatedBlogPost = await BlogPostsModel.findByIdAndUpdate(
      blogPostID,
      req.body,
      {
        new: true,
      }
    );
    if (updatedBlogPost) {
      res.send(updatedBlogPost);
    } else {
      next(createHttpError(404, `User with id ${blogPostID} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

blogPostsRouter.delete("/:blogPostID", async (req, res, next) => {
  try {
    const blogPostID = req.params.blogPostID;
    const deletedBlogPost = await BlogPostsModel.findByIdAndDelete(blogPostID);
    if (deletedBlogPost) {
      res.status(204).send();
    } else {
      next(createHttpError(404, `User with id ${blogPostID} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

export default blogPostsRouter;
