import { Router } from "express";
import {
  Product,
  Review,
  Category,
  ProductCategory,
  Cart,
  User,
} from "../../db/models/index.js";
import { Op } from "sequelize";

const cartRouter = Router();

cartRouter.get("/", async (req, res, next) => {
  try {
    const products = await Cart.findAll({
      include: [Product, User],
    });
    res.send(products);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

cartRouter.get("/:userId", async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      include: [Product, User],
      where: {
        userId: req.params.userId,
      },
    });
    if (cart) {
      res.send(cart);
    } else {
      res.status(404).send(`Cart for user ${req.params.userId} not found`);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

cartRouter.post("/", async (req, res, next) => {
  try {
    const newCart = await Cart.create(req.body);
    res.status(201).send(newCart);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

cartRouter.put("/", async (req, res, next) => {
  try {
    const { productId, userId, count } = req.body;
    const updatedCart = await Cart.update(
      { count },
      {
        where: {
          userId,
          productId,
        },
        returning: true,
      }
    );
    if (updatedCart[0] > 0) {
      res.send(updatedCart[1][0]);
    } else {
      res
        .status(404)
        .send(
          `Cart with productId: ${productId} and userId: ${userId} not found`
        );
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

cartRouter.delete("/", async (req, res, next) => {
  try {
    const { productId, userId } = req.body;
    const result = await Cart.destroy({
      where: {
        userId,
        productId,
      },
    });

    if (result > 0) {
      res.status(204).send();
    } else {
      res
        .status(404)
        .send(
          `Cart with productId: ${productId} and userId: ${userId} not found`
        );
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default cartRouter;
