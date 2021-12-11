import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { getMedia, writeMedia } from "../../lib/fs-tools.js";
import uniqid from "uniqid";
import createHttpError from "http-errors";
import { validationResult } from "express-validator";
import { mediaValidation, reviewValidation } from "./validation.js";

const mediaRouter = express.Router();

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
    folder: "netflix-posters",
  },
});

const posterUploader = multer({ storage: cloudStorage }).single("poster");

mediaRouter.get("/", async (req, res, next) => {
  try {
    const media = await getMedia();
    res.send(media);
  } catch (error) {
    next(error);
  }
});

mediaRouter.get("/:id", async (req, res, next) => {
  try {
    const media = await getMedia();

    const singleMedia = media.find(
      (mediaItem) => mediaItem.id === req.params.id
    );
    if (singleMedia) {
      res.send(singleMedia);
    } else {
      next(createHttpError(404, `Media with ID ${req.params.id} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

mediaRouter.post("/", mediaValidation, async (req, res, next) => {
  try {
    const errorsList = validationResult(req);
    if (!errorsList.isEmpty()) {
      next(
        createHttpError(400, "Some Errors occured in the request body", {
          errorsList,
        })
      );
    } else {
      const newMedia = {
        reviews: [],
        poster: `https://ui-avatars.com/api/?name=${
          req.body.title ? req.body.title.split(" ").join("+") : ""
        }`,
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
        id: uniqid(),
      };

      const media = await getMedia();
      media.push(newMedia);
      await writeMedia(media);
      res.status(201).send(newMedia);
    }
  } catch (error) {
    next(error);
  }
});

mediaRouter.patch("/:id", async (req, res, next) => {
  try {
    const media = await getMedia();

    const index = media.findIndex(
      (mediaItem) => mediaItem.id === req.params.id
    );
    const updatedMedia = {
      ...media[index],
      ...req.body,
      updatedAt: new Date(),
    };

    media[index] = updatedMedia;
    await writeMedia(media);
    res.send(updatedMedia);
  } catch (error) {
    next(error);
  }
});

mediaRouter.delete("/:id", async (req, res, next) => {
  try {
    const media = await getMedia();
    const remainingMedia = media.filter(
      (mediaItem) => mediaItem.id !== req.params.id
    );
    await writeMedia(remainingMedia);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

mediaRouter.post("/:id/reviews", reviewValidation, async (req, res, next) => {
  try {
    const errorsList = validationResult(req);
    if (!errorsList.isEmpty()) {
      next(
        createHttpError(400, "Some Errors occured in the request body", {
          errorsList,
        })
      );
    } else {
      const media = await getMedia();
      const newReview = {
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
        id: uniqid(),
      };

      const index = media.findIndex(
        (mediaItem) => mediaItem.id === req.params.id
      );
      const updatedMedia = {
        ...media[index],
        updatedAt: new Date(),
      };
      updatedMedia.reviews.push(newReview);

      media[index] = updatedMedia;
      await writeMedia(media);
      res.status(201).send(newReview);
    }
  } catch (error) {
    next(error);
  }
});

mediaRouter.delete("/:id/reviews/:review", async (req, res, next) => {
  try {
    const media = await getMedia();
    const index = media.findIndex(
      (mediaItem) => mediaItem.id === req.params.id
    );
    const reviews = media[index].reviews;
    const remainingReviews = reviews.filter(
      (review) => review.id !== req.params.review
    );
    media[index].reviews = remainingReviews;
    await writeMedia(media);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

mediaRouter.post("/:id/poster", posterUploader, async (req, res, next) => {
  try {
    const media = await getMedia();
    const index = media.findIndex(
      (mediaItem) => mediaItem.id === req.params.id
    );

    const updatedMedia = {
      ...media[index],
      poster: req.file.path,
      updatedAt: new Date(),
    };
    console.log(media[index], updatedMedia);
    media[index] = updatedMedia;
    await writeMedia(media);
    res.send(updatedMedia);
  } catch (error) {
    next(error);
  }
});

export default mediaRouter;
