import { Router } from "express";
import { Category } from "../../db/models/index.js";
import { Op } from "sequelize";

const categoryRouter = Router();

categoryRouter.get("/", async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.send(categories);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

categoryRouter.get("/:id", async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (category) {
      res.send(category);
    } else {
      res.status(404).send(`Category with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

categoryRouter.post("/", async (req, res, next) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).send(newCategory);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

categoryRouter.put("/:id", async (req, res, next) => {
  try {
    const updatedCategory = await Category.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    if (updatedCategory[0] > 0) {
      res.send(updatedCategory[1][0]);
    } else {
      res.status(404).send(`Category with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

categoryRouter.delete("/:id", async (req, res, next) => {
  try {
    const result = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (result > 0) {
      res.status(204).send();
    } else {
      res.status(404).send(`Category with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default categoryRouter;
