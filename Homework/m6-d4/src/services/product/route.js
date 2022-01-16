import { Router } from "express";
import {
  Product,
  Review,
  Category,
  ProductCategory,
} from "../../db/models/index.js";
import { Op } from "sequelize";

const productRouter = Router();

productRouter.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [Category, Review],
      where: {
        ...(req.query.search && {
          [Op.or]: [
            {
              name: { [Op.iLike]: `%${req.query.search}%` },
            },
            {
              description: { [Op.iLike]: `%${req.query.search}%` },
            },
          ],
        }),
        ...(req.query.price && {
          price: {
            [Op.between]: req.query.price.split(","),
          },
        }),
      },
      order: [["updatedAt", "DESC"]],
      limit: req.query.rows,
      offset:
        req.query.page &&
        req.query.rows &&
        (Number(req.query.page) - 1) * Number(req.query.rows),
    });
    res.send(products);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

productRouter.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Review }],
    });
    if (product) {
      res.send(product);
    } else {
      res.status(404).send(`Product with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

productRouter.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const { categoryId, ...rest } = req.body;
    const newProduct = await Product.create(rest);
    if (newProduct) {
      const dataToInsert = categoryId.map((id) => ({
        categoryId: id,
        productId: newProduct.id,
      }));
      const data = await ProductCategory.bulkCreate(dataToInsert);
      res.status(201).send({ ...newProduct.dataValues, productCategory: data });
    } else {
      throw new Error("unknown error");
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

productRouter.put("/:id", async (req, res, next) => {
  try {
    const updatedProduct = await Product.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    if (updatedProduct[0] > 0) {
      res.send(updatedProduct[1][0]);
    } else {
      res.status(404).send(`Product with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

productRouter.delete("/:id", async (req, res, next) => {
  try {
    const result = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (result > 0) {
      res.status(204).send();
    } else {
      res.status(404).send(`Product with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default productRouter;
