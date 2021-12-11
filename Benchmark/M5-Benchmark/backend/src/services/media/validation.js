import { body } from "express-validator";

export const mediaValidation = [
  body("title").exists().withMessage("Title is a mandatory field!"),
  body("year")
    .exists()
    .withMessage("Year is a mandatory field!")
    .isInt()
    .withMessage("Year is an integer!"),
  body("imdbID").exists().withMessage("ImdbID is a mandatory field!"),
  body("type").exists().withMessage("Type is a mandatory field!"),
];

export const reviewValidation = [
  body("comment").exists().withMessage("Comment is a mandatory field!"),
  body("rate")
    .exists()
    .withMessage("Rate is a mandatory field!")
    .isInt({ min: 0, max: 5 })
    .withMessage("Rate must be between an integer between 0 and 5"),
];
