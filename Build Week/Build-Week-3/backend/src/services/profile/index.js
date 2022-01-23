import express from "express";
import createHttpError from "http-errors";
import ProfileModel from "./schema.js";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { getPDFReadableStream } from "./pdf-tool.js";
import { pipeline } from "stream";
import { read } from "fs";
// import q2m from "query-to-mongo";

const profileRouter = express.Router();

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
    folder: "linkedin-profile-images",
  },
});
const posterUploader = multer({ storage: cloudStorage }).single(
  "profile-image"
);

profileRouter.post("/", posterUploader, async (req, res, next) => {
  try {
    console.log(req.body, req.file);
    const uniqueUsername = await ProfileModel.find({
      username: req.body.username,
    });
    if (uniqueUsername.length !== 0) {
      next(createHttpError(400, "username already exists"));
    } else {
      const newProfile = new ProfileModel({
        ...req.body,
        image: (req.file && req.file.path) || "http://placeimg.com/640/480",
      });
      const createdProfile = await newProfile.save();
      res.status(201).send(createdProfile);
    }
  } catch (error) {
    next(error);
  }
});

profileRouter.get("/", async (req, res, next) => {
  try {
    const profile = await ProfileModel.find();
    res.send(profile);
  } catch (error) {
    next(error);
  }
});

profileRouter.get("/:profileID", async (req, res, next) => {
  try {
    const profileID = req.params.profileID;
    const profile = await ProfileModel.findById(profileID);
    if (profile) {
      res.send(profile);
    } else {
      next(createHttpError(404, `Profile with id ${profileID} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

profileRouter.put("/:profileID", posterUploader, async (req, res, next) => {
  try {
    const profileID = req.params.profileID;
    const data = req.file ? { ...req.body, image: req.file.path } : req.body;
    const updatedProfile = await ProfileModel.findByIdAndUpdate(
      profileID,
      data,
      {
        new: true,
      }
    );
    if (updatedProfile) {
      res.send(updatedProfile);
    } else {
      next(createHttpError(404, `Profile with id ${profileID} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

// profileRouter.post(
//   "/:profileID/picture",
//   posterUploader,
//   async (req, res, next) => {
//     try {
//       console.log(req.body.name);
//       const profileID = req.params.profileID;
//       const updatedProfile = await ProfileModel.findByIdAndUpdate(
//         profileID,
//         { image: req.file.path },
//         {
//           new: true,
//         }
//       );
//       if (updatedProfile) {
//         res.send(updatedProfile);
//       } else {
//         next(createHttpError(404, `Profile with id ${profileID} not found!`));
//       }
//     } catch (error) {
//       next(error);
//     }
//   }
// );

profileRouter.get("/:profileID/cv", async (req, res, next) => {
  try {
    const profileID = req.params.profileID;
    const profile = await ProfileModel.findById(profileID);
    // const experiences = await
    const experiences = [
      {
        _id: "5d925e677360c41e0046d1f5",
        role: "CTO",
        company: "Strive School",
        startDate: "2019-06-16T22:00:00.000Z",
        endDate: "2019-06-16T22:00:00.000Z", //could be null
        description: "Doing stuff here and there",
        area: "Berlin",
        username: "admin",
        createdAt: "2019-09-30T19:58:31.019Z",
        updatedAt: "2019-09-30T19:58:31.019Z",
        image:
          "https://res.cloudinary.com/do5h7ut8m/image/upload/v1642421769/linkedin-profile-images/alxyj66q8c3ph4luk0zc.jpg",
      },
    ];
    if (profile && experiences) {
      res.setHeader("Content-Disposition", "attachment; filename=cv.pdf");
      const source = getPDFReadableStream(profile, experiences);
      const destination = res;
      pipeline(source, destination, (err) => {
        if (err) next(err);
      });
    } else {
      next(
        createHttpError(404, `Profile with ID ${req.params.profile} not found!`)
      );
    }
  } catch (error) {
    next(error);
  }
});

// profileRouter.delete("/:profileID", async (req, res, next) => {
//   try {
//     const profileID = req.params.profileID;
//     const deletedProfile = await ProfileModel.findByIdAndDelete(profileID);
//     if (deletedProfile) {
//       res.status(204).send();
//     } else {
//       next(createHttpError(404, `Profile with id ${profileID} not found!`));
//     }
//   } catch (error) {
//     next(error);
//   }
// });

profileRouter.post("/:profileID/follow", async (req, res, next) => {
  try {
    const profileID = req.params.profileID;
    const follower = await ProfileModel.findById(req.body.follower);
    if (follower) {
      const isFollowing = await ProfileModel.find({
        followedBy: req.body.follower,
      });
      if (isFollowing.length > 0) {
        next(
          createHttpError(
            409,
            `Profile with id ${profileID} is already followed by ${req.body.follower}`
          )
        );
      } else {
        const updatedProfile = await ProfileModel.findByIdAndUpdate(
          profileID,
          { $push: { followedBy: req.body.follower } },
          {
            new: true,
          }
        );
        if (updatedProfile) {
          res.send(updatedProfile);
        } else {
          next(createHttpError(404, `Profile with id ${profileID} not found!`));
        }
      }
    } else {
      next(
        createHttpError(404, `Profile with id ${req.body.follower} not found!`)
      );
    }
  } catch (error) {
    next(error);
  }
});

profileRouter.delete("/:profileID/follow", async (req, res, next) => {
  try {
    const profileID = req.params.profileID;
    const updatedProfile = await ProfileModel.findByIdAndUpdate(profileID, {
      $pull: { followedBy: req.body.follower },
    });
    if (updatedProfile) {
      res.status(204).send();
    } else {
      next(createHttpError(404, `Profile with id ${profileID} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

export default profileRouter;
