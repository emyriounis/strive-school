import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";
import createHttpError from "http-errors";
import { validationResult } from "express-validator";
import { blogPostsValidation } from "./validation.js";

const blogPostsRouter = express.Router();

const blogPostsJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "blogPosts.json"
);
const getBlogPosts = () => JSON.parse(fs.readFileSync(blogPostsJSONPath));
const writeBlogPosts = (content) =>
  fs.writeFileSync(blogPostsJSONPath, JSON.stringify(content));

blogPostsRouter.get("/", (req, res, next) => {
  try {
    const blogPosts = getBlogPosts();

    if (req.query && req.query.category) {
      const filteredBlogPosts = blogPosts.filter(
        (blogPost) => blogPost.category === req.query.category
      );
      res.send(filteredBlogPosts);
    } else {
      res.send(blogPosts);
    }
  } catch (error) {
    next(error);
  }
});

blogPostsRouter.get("/:blogPost", (req, res, next) => {
  try {
    const blogPosts = getBlogPosts();

    const blogPost = blogPosts.find(
      (blogPosts) => blogPosts.id === req.params.blogPost
    );
    if (blogPost) {
      res.send(blogPost);
    } else {
      next(
        createHttpError(
          404,
          `BlogPost with ID ${req.params.blogPost} not found!`
        )
      );
    }
  } catch (error) {
    next(error);
  }
});

blogPostsRouter.post("/", blogPostsValidation, (req, res, next) => {
  try {
    const errorsList = validationResult(req);
    if (!errorsList.isEmpty()) {
      next(
        createHttpError(400, "Some Errors occured in the request body", {
          errorsList,
        })
      );
    } else {
      const newBlogPost = {
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
        id: uniqid(),
        cover: `https://ui-avatars.com/api/?name=${
          req.body.title ? req.body.title.split(" ").join("+") : ""
        }`,
      };
      const blogPosts = getBlogPosts();

      blogPosts.push(newBlogPost);
      writeBlogPosts(blogPosts);
      res.status(201).send(newBlogPost);
    }
  } catch (error) {
    next(error);
  }
});

blogPostsRouter.put("/:blogPost", (req, res, next) => {
  try {
    const blogPosts = getBlogPosts();
    const index = blogPosts.findIndex(
      (blogPost) => blogPost.id === req.params.blogPost
    );
    const updatedBlogPost = {
      ...blogPosts[index],
      ...req.body,
      updatedAt: new Date(),
    };
    blogPosts[index] = updatedBlogPost;
    writeBlogPosts(blogPosts);
    res.send(updatedBlogPost);
  } catch (error) {
    next(error);
  }
});

blogPostsRouter.delete("/:blogPost", (req, res, next) => {
  try {
    const blogPosts = getBlogPosts();
    const remainingBlogPosts = blogPosts.filter(
      (blogPost) => blogPost.id !== req.params.blogPost
    );
    writeBlogPosts(remainingBlogPosts);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default blogPostsRouter;
