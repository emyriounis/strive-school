import express from "express";
import createHttpError from "http-errors";
import CartsModel from "./schema.js";
import q2m from "query-to-mongo";

const cartRouter = express.Router();

cartRouter.post("/", async (req, res, next) => {
  try {
    const newCart = new CartsModel(req.body);
    const createdCart = await newCart.save();
    res.status(201).send(createdCart);
  } catch (error) {
    next(error);
  }
});

cartRouter.get("/", async (req, res, next) => {
  try {
    const carts = await CartsModel.find();
    res.send(carts);
  } catch (error) {
    next(error);
  }
});

cartRouter.get("/:cartID", async (req, res, next) => {
  try {
    const cartID = req.params.cartID;
    const cart = await CartsModel.findById(cartID);
    if (cart) {
      res.send(cart);
    } else {
      next(createHttpError(404, `Cart with id ${cartID} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

cartRouter.put("/:cartID", async (req, res, next) => {
  try {
    const cartID = req.params.cartID;
    const updatedCart = await CartsModel.findByIdAndUpdate(cartID, req.body, {
      new: true,
    });
    if (updatedCart) {
      res.send(updatedCart);
    } else {
      next(createHttpError(404, `Cart with id ${cartID} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

cartRouter.delete("/:cartID", async (req, res, next) => {
  try {
    const cartID = req.params.cartID;
    const deletedCart = await CartsModel.findByIdAndDelete(cartID);
    if (deletedCart) {
      res.status(204).send();
    } else {
      next(createHttpError(404, `Cart with id ${cartID} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

export default cartRouter;
