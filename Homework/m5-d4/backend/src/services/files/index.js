import express from "express";
import multer from "multer";
import createHttpError from "http-errors";
import path, { join } from "path";
import { getAuthors, writeAuthors } from "../../lib/fs-tools.js";
import { getBlogPosts, writeBlogPosts } from "../../lib/fs-tools.js";
import { saveAuthorsAvatars } from "../../lib/fs-tools.js";
import { saveBlogPostsCover } from "../../lib/fs-tools.js";

const filesRouter = express.Router();

const avatarUploader = multer({
  fileFilter: (req, file, multerNext) => {
    if (file.mimetype !== "image/jpeg") {
      multerNext(createHttpError(400, "only jpeg are allowed"));
    } else {
      multerNext(null, true);
    }
  },
}).single("authorAvatar");

const coverUploader = multer({
  fileFilter: (req, file, multerNext) => {
    if (file.mimetype !== "image/jpeg") {
      multerNext(createHttpError(400, "only jpeg are allowed"));
    } else {
      multerNext(null, true);
    }
  },
}).single("blogCover");

filesRouter.post(
  "/authors/:id/uploadAvatar",
  avatarUploader,
  async (req, res, next) => {
    try {
      await saveAuthorsAvatars(
        `${req.params.id}${path.extname(req.file.originalname)}`,
        req.file.buffer
      );

      const authors = await getAuthors();
      const index = authors.findIndex((author) => author.id === req.params.id);

      const publicFolderAvatarPath = `http://localhost:8080/img/authorAvatar/${
        req.params.id
      }${path.extname(req.file.originalname)}`;

      const updatedAuthor = {
        ...authors[index],
        avatar: publicFolderAvatarPath,
        updatedAt: new Date(),
      };
      authors[index] = updatedAuthor;
      await writeAuthors(authors);
      res.send(updatedAuthor);
    } catch (error) {
      next(error);
    }
  }
);

filesRouter.post(
  "/blogPosts/:id/uploadCover",
  coverUploader,
  async (req, res, next) => {
    try {
      await saveBlogPostsCover(
        `${req.params.id}${path.extname(req.file.originalname)}`,
        req.file.buffer
      );

      const blogPosts = await getBlogPosts();
      const index = blogPosts.findIndex(
        (blogPost) => blogPost.id === req.params.id
      );

      const publicFolderAvatarPath = `http://localhost:8080/img/blogCover/${
        req.params.id
      }${path.extname(req.file.originalname)}`;

      const updatedBlogPost = {
        ...blogPosts[index],
        cover: publicFolderAvatarPath,
        updatedAt: new Date(),
      };
      blogPosts[index] = updatedBlogPost;
      await writeBlogPosts(blogPosts);
      res.send(blogPosts);
    } catch (error) {
      next(error);
    }
  }
);

export default filesRouter;
