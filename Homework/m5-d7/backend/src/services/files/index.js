import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import createHttpError from "http-errors";
import { getFiles, writeFiles } from "../../lib/fs-tools.js";
import uniqid from "uniqid";

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
    folder: "strive-box",
  },
});

const fileUploader = multer({
  fileFilter: (req, file, multerNext) => {
    if (file.mimetype !== "image/gif") {
      multerNext(
        createHttpError(400, "File type not supported: please try with a gif.")
      );
    } else {
      multerNext(null, true);
    }
  },
  storage: cloudStorage,
}).single("file");
const fileDeleter = multer({ storage: cloudStorage }).single("file");

filesRouter.get("/", async (req, res, next) => {
  try {
    const files = await getFiles();
    res.send(files);
  } catch (error) {
    next(error);
  }
});

filesRouter.post("/", fileUploader, async (req, res, next) => {
  try {
    const files = await getFiles();
    const { originalname, path, encoding, mimetype, size, filename } = req.file;
    const newFile = {
      id: uniqid(),
      title: originalname,
      originalname,
      encoding,
      mimetype,
      size,
      filename,
      url: path,
      createdAt: new Date(),
      updatedAt: new Date(),
      isStarred: false,
    };
    files.push(newFile);
    await writeFiles(files);

    res.send(newFile);
  } catch (error) {
    next(error);
  }
});

filesRouter.patch("/:id/isStarred", async (req, res, next) => {
  try {
    const files = await getFiles();
    const index = files.findIndex((file) => file.id === req.params.id);

    const updatedFile = {
      ...files[index],
      isStarred: req.body.isStarred,
      updatedAt: new Date(),
    };
    files[index] = updatedFile;
    await writeFiles(files);

    res.send(updatedFile);
  } catch (error) {
    next(error);
  }
});

filesRouter.patch("/:id/title", async (req, res, next) => {
  try {
    let files = await getFiles();
    console.log(
      files.map((f) => f.id),
      req.params.id
    );
    const index = files.findIndex((file) => file.id === req.params.id);

    console.log(
      files.map((f) => f.id),
      req.params.id
    );
    const updatedFile = {
      ...files[index],
      title: req.body.title,
      updatedAt: new Date(),
    };
    files[index] = updatedFile;
    await writeFiles(files);

    res.send(updatedFile);
  } catch (error) {
    next(error);
  }
});

filesRouter.delete("/:id", fileDeleter, async (req, res, next) => {
  try {
    const files = await getFiles();
    const { filename } = files.find((file) => file.id === req.params.id);
    cloudinary.uploader.destroy(filename, (error, result) => {
      if (error) throw new Error(error);
    });

    const remainingFiles = files.filter((file) => file.id !== req.params.id);
    await writeFiles(remainingFiles);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default filesRouter;
