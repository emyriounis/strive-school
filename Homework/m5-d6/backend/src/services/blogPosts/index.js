import express from "express";
import { getBlogPosts, writeBlogPosts } from "../../lib/fs-tools.js";
import { getComments, writeComments } from "../../lib/fs-tools.js";
import uniqid from "uniqid";
import createHttpError from "http-errors";
import { validationResult } from "express-validator";
import { blogPostsValidation } from "./validation.js";

const blogPostsRouter = express.Router();

blogPostsRouter.get("/", async (req, res, next) => {
  try {
    const blogPosts = await getBlogPosts();

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

blogPostsRouter.get("/:blogPost", async (req, res, next) => {
  try {
    const blogPosts = await getBlogPosts();

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

blogPostsRouter.post("/", blogPostsValidation, async (req, res, next) => {
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
      const blogPosts = await getBlogPosts();

      blogPosts.push(newBlogPost);
      await writeBlogPosts(blogPosts);
      res.status(201).send(newBlogPost);
    }
  } catch (error) {
    next(error);
  }
});

blogPostsRouter.put("/:blogPost", async (req, res, next) => {
  try {
    const blogPosts = await getBlogPosts();
    const index = blogPosts.findIndex(
      (blogPost) => blogPost.id === req.params.blogPost
    );
    const updatedBlogPost = {
      ...blogPosts[index],
      ...req.body,
      updatedAt: new Date(),
    };
    blogPosts[index] = updatedBlogPost;
    await writeBlogPosts(blogPosts);
    res.send(updatedBlogPost);
  } catch (error) {
    next(error);
  }
});

blogPostsRouter.delete("/:blogPost", async (req, res, next) => {
  try {
    const blogPosts = await getBlogPosts();
    const remainingBlogPosts = blogPosts.filter(
      (blogPost) => blogPost.id !== req.params.blogPost
    );
    await writeBlogPosts(remainingBlogPosts);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

blogPostsRouter.get("/:id/comments", async (req, res, next) => {
  try {
    const allComments = await getComments();
    const blogPostComments = allComments.find(
      (commentsList) => commentsList.blogPostID === req.params.id
    );
    res.send(blogPostComments.comments);
  } catch (error) {
    next(error);
  }
});

blogPostsRouter.post("/:id/comments", async (req, res, next) => {
  try {
    const newComment = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: uniqid(),
      blogPostID: req.params.id,
    };

    const allComments = await getComments();

    allComments.push(newComment);
    await writeComments(allComments);
    res.status(201).send(newComment);
  } catch (error) {
    next(error);
  }
});

export default blogPostsRouter;
