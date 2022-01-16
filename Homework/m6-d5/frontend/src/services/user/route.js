import { Router } from "express";
import { User } from "../../db/models/index.js";
import { Op } from "sequelize";

const userRouter = Router();

userRouter.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

userRouter.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send(`User with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

userRouter.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const newUser = await User.create(req.body);
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

userRouter.put("/:id", async (req, res, next) => {
  try {
    const updatedUser = await User.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    if (updatedUser[0] > 0) {
      res.send(updatedUser[1][0]);
    } else {
      res.status(404).send(`User with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

userRouter.delete("/:id", async (req, res, next) => {
  try {
    const result = await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (result > 0) {
      res.status(204).send();
    } else {
      res.status(404).send(`User with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default userRouter;
