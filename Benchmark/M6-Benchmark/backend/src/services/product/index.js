import express from "express";
import createHttpError from "http-errors";
import ProductsModel from "./schema.js";
// import ReviewsModel from "../review/schema.js";
import q2m from "query-to-mongo";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const productRouter = express.Router();

productRouter.post("/", async (req, res, next) => {
  try {
    const newProduct = new ProductsModel(req.body);
    const createdProduct = await newProduct.save();
    res.status(201).send(createdProduct);
  } catch (error) {
    next(error);
  }
});

productRouter.get("/", async (req, res, next) => {
  try {
    const mongoQuery = q2m(req.query);
    const totalProducts = await ProductsModel.countDocuments(
      mongoQuery.criteria
    );

    const products = await ProductsModel.find(mongoQuery)
      .populate({
        path: "reviews",
        select: "-productID",
      })
      .limit(mongoQuery.options.limit || 10)
      .skip(mongoQuery.options.skip || 0)
      .sort(mongoQuery.options.sort);

    res.send({
      links: mongoQuery.links("/products", totalProducts) || {
        next: "/products?offset=10&limit=10",
        last: `/products?offset=${
          (Math.ceil(totalProducts / 10) - 1) * 10
        }&limit=10`,
      },
      totalPages: Math.ceil(totalProducts / (mongoQuery.options.limit || 10)),
      totalProducts,
      products,
    });
  } catch (error) {
    next(error);
  }
});

productRouter.get("/:productID", async (req, res, next) => {
  try {
    const productID = req.params.productID;
    const product = await ProductsModel.findById(productID).populate({
      path: "reviews",
      select: "-productID",
    });
    if (product) {
      res.send(product);
    } else {
      next(createHttpError(404, `Product with id ${productID} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

productRouter.put("/:productID", async (req, res, next) => {
  try {
    const productID = req.params.productID;
    const updatedProduct = await ProductsModel.findByIdAndUpdate(
      productID,
      req.body,
      {
        new: true,
      }
    );
    if (updatedProduct) {
      res.send(updatedProduct);
    } else {
      next(createHttpError(404, `Product with id ${productID} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

productRouter.delete("/:productID", async (req, res, next) => {
  try {
    const productID = req.params.productID;
    const deletedBlogPost = await ProductsModel.findByIdAndDelete(productID);
    if (deletedBlogPost) {
      res.status(204).send();
    } else {
      next(createHttpError(404, `Product with id ${productID} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

productRouter.get("/:productID/reviews", async (req, res, next) => {
  try {
    const productID = req.params.productID;
    const product = await ProductsModel.findById(productID).populate({
      path: "reviews",
      select: "-productID",
    });
    if (product && product.reviews) {
      res.send(product.reviews);
    } else {
      next(createHttpError(404, `Product with id ${productID} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

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
    folder: "product-covers",
  },
});
const posterUploader = multer({ storage: cloudStorage }).single(
  "product-cover"
);

productRouter.post(
  "/:productID/upload",
  posterUploader,
  async (req, res, next) => {
    try {
      const productID = req.params.productID;
      const updatedProduct = await ProductsModel.findByIdAndUpdate(
        productID,
        { imageUrl: req.file.path },
        {
          new: true,
        }
      );
      if (updatedProduct) {
        res.send(updatedProduct);
      } else {
        next(createHttpError(404, `Product with id ${productID} not found!`));
      }
    } catch (error) {
      next(error);
    }
  }
);

export default productRouter;
