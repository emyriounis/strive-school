import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
// import createHttpError from "http-errors";
// import path, { join } from "path";
import { getAuthors, writeAuthors } from "../../lib/fs-tools.js";
import { getBlogPosts, writeBlogPosts } from "../../lib/fs-tools.js";
// import { saveAuthorsAvatars } from "../../lib/fs-tools.js";
// import { saveBlogPostsCover } from "../../lib/fs-tools.js";

const filesRouter = express.Router();

const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET, CLOUDINARY_URL } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
  api_url: CLOUDINARY_URL,
});

const cloudStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "strive-blogs",
  },
});

const avatarUploader = multer({ storage: cloudStorage }).single("authorAvatar");

const coverUploader = multer({ storage: cloudStorage }).single("blogCover");

filesRouter.post(
  "/authors/:id/uploadAvatar",
  avatarUploader,
  async (req, res, next) => {
    try {
      const authors = await getAuthors();
      const index = authors.findIndex((author) => author.id === req.params.id);

      const updatedAuthor = {
        ...authors[index],
        avatar: req.file.path,
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
      const blogPosts = await getBlogPosts();
      const index = blogPosts.findIndex(
        (blogPost) => blogPost.id === req.params.id
      );

      const updatedBlogPost = {
        ...blogPosts[index],
        cover: req.file.path,
        updatedAt: new Date(),
      };
      blogPosts[index] = updatedBlogPost;
      await writeBlogPosts(blogPosts);
      res.send(updatedBlogPost);
    } catch (error) {
      next(error);
    }
  }
);

// filesRouter.post(
//   "/test",
//   multer({ storage: cloudStorage }).single("blogCover"),
//   async (req, res, next) => {
//     try {
//       console.log(req.file);
//       res.send(req.file);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

export default filesRouter;
