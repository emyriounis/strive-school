import { body } from "express-validator";

export const blogPostsValidation = [
  body("title").exists().withMessage("Title is a mandatory field!"),
  body("category").exists().withMessage("Category is a mandatory field!"),
  body("author").exists().withMessage("Author is a mandatory field!"),
];
