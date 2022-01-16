import express from "express";
import createHttpError from "http-errors";
import ReviewsModel from "./schema.js";
import ProductModel from "../product/schema.js";
import q2m from "query-to-mongo";

const reviewRouter = express.Router();

reviewRouter.post("/", async (req, res, next) => {
  try {
    const newReview = new ReviewsModel(req.body);
    const createdReview = await newReview.save();
    await ProductModel.findByIdAndUpdate(req.body.productID, {
      $push: { reviews: createdReview._id.toString() },
    });
    res.status(201).send(createdReview);
  } catch (error) {
    next(error);
  }
});

reviewRouter.get("/", async (req, res, next) => {
  try {
    const reviews = await ReviewsModel.find().populate("productID");
    res.send(reviews);
  } catch (error) {
    next(error);
  }
});

reviewRouter.get("/:reviewID", async (req, res, next) => {
  try {
    const reviewID = req.params.reviewID;
    const review = await ReviewsModel.findById(reviewID).populate("productID");
    if (review) {
      res.send(review);
    } else {
      next(createHttpError(404, `Review with id ${reviewID} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

reviewRouter.put("/:reviewID", async (req, res, next) => {
  try {
    const reviewID = req.params.reviewID;
    const updatedReview = await ReviewsModel.findByIdAndUpdate(
      reviewID,
      req.body,
      {
        new: true,
      }
    );
    if (updatedReview) {
      res.send(updatedReview);
    } else {
      next(createHttpError(404, `Review with id ${reviewID} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

reviewRouter.delete("/:reviewID", async (req, res, next) => {
  try {
    const reviewID = req.params.reviewID;
    const deletedReview = await ReviewsModel.findByIdAndDelete(reviewID);
    if (deletedReview) {
      res.status(204).send();
    } else {
      next(createHttpError(404, `Product with id ${reviewID} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

export default reviewRouter;
