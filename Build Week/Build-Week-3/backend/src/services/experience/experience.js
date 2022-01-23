import express from "express";
import createHttpError from "http-errors";
import ExperienceModel from "./experienceSchema.js";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import json2csv from "json2csv";
import ProfileModel from "../profile/schema.js";

const Json2csvParser = json2csv.Parser;
const ExperienceRouter = express.Router();

ExperienceRouter.post("/:userName/experiences", async (req, res, next) => {
  try {
    const newExp = new ExperienceModel({
      ...req.body,
      username: req.params.userName,
    });
    const { _id } = await newExp.save();
    res.status(201).send({ _id });
  } catch (error) {
    next(error);
  }
});

ExperienceRouter.get("/:userName/experiences", async (req, res, next) => {
  try {
    const exp = await ExperienceModel.find({
      username: req.params.userName,
    });
    res.send(exp);
  } catch (error) {
    next(error);
  }
});

ExperienceRouter.get("/:userName/experiences/csv", async (req, res, next) => {
  try {
    const source = await ExperienceModel.find({
      username: req.params.userName,
    });
    if (source) {
      const fields = [
        "_id",
        "role",
        "company",
        "description",
        "area",
        "username",
        "startDate",
        "endDate",
      ];
      const options = { fields };
      const json2csvParser = new Json2csvParser(options);
      const csvData = json2csvParser.parse(source);
      res.setHeader(
        "Content-Disposition",
        "attachment; filename = experiences.csv"
      );
      res.set("Content-Type", "text/csv");
      res.status(200).end(csvData);
    } else {
      res.status(404).send("source not found");
    }
  } catch (error) {
    next(createHttpError(500, "Error in downloading CSV file"));
    console.log(error);
  }
});

ExperienceRouter.get(
  "/:userName/experiences/:expId",
  async (req, res, next) => {
    try {
      const expId = req.params.expId;
      const foundExp = await ExperienceModel.findById(expId);

      if (foundExp) {
        res.send(foundExp);
      } else {
        next(createHttpError(404, `experience with id ${expId} not found!`));
      }
    } catch (error) {
      next(error);
    }
  }
);

ExperienceRouter.put(
  "/:userName/experiences/:expId",
  async (req, res, next) => {
    try {
      console.log(req.body);
      const expId = req.params.expId;
      const foundExpUpdated = await ExperienceModel.findByIdAndUpdate(
        expId,
        req.body,
        { new: true }
      );

      if (foundExpUpdated) {
        res.send(foundExpUpdated);
      } else {
        next(createHttpError(404, `experience with id ${expId} not found!`));
      }
    } catch (error) {
      next(error);
    }
  }
);

ExperienceRouter.delete(
  "/:userName/experiences/:expId",
  async (req, res, next) => {
    try {
      const expId = req.params.expId;
      const foundExpDeleted = await ExperienceModel.findByIdAndDelete(expId);

      if (foundExpDeleted) {
        res.send("successfully deleted");
      } else {
        next(createHttpError(404, `experience with id ${expId} not found!`));
      }
    } catch (error) {
      next(error);
    }
  }
);

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
    folder: "experience-image",
  },
});
const posterUploader = multer({ storage: cloudStorage }).single("exp-image");

ExperienceRouter.post(
  "/:userName/experiences/:expId/picture",
  posterUploader,
  async (req, res, next) => {
    try {
      const expId = req.params.expId;
      const updatedExp = await ExperienceModel.findByIdAndUpdate(
        expId,
        { image: req.file.path },
        {
          new: true,
        }
      );
      if (updatedExp) {
        res.send(updatedExp);
      } else {
        next(createHttpError(404, `experience with id ${expId} not found!`));
      }
    } catch (error) {
      next(error);
    }
  }
);

export default ExperienceRouter;
