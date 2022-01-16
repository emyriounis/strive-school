import { Router } from "express";
import { Product, Review } from "../../db/models/index.js";
import { Op } from "sequelize";

const reviewRouter = Router();

reviewRouter.get("/", async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      include: [{ model: Product }],
    });
    res.send(reviews);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

reviewRouter.get("/:id", async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (review) {
      res.send(review);
    } else {
      res.status(404).send(`Review with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

reviewRouter.post("/", async (req, res, next) => {
  try {
    const newReview = await Review.create(req.body);
    res.status(201).send(newReview);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

reviewRouter.put("/:id", async (req, res, next) => {
  try {
    const updatedReview = await Review.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    if (updatedReview[0] > 0) {
      res.send(updatedReview[1][0]);
    } else {
      res.status(404).send(`Review with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

reviewRouter.delete("/:id", async (req, res, next) => {
  try {
    const result = await Review.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (result > 0) {
      res.status(204).send();
    } else {
      res.status(404).send(`Review with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default reviewRouter;
