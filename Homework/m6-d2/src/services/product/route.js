import { Router } from "express";
import pool from "../../utils/db/connect.js";
import moment from "moment";

const productRouter = Router();

productRouter.get("/", async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM product;");
    const reviews = await pool.query("SELECT * FROM review;");
    const productsWithReviews = result.rows.map((product) => {
      const single = {
        ...product,
        reviews: reviews.rows.findAll(
          (review) => review.product_id === product.product_id
        ),
      };
      return single;
    });
    res.send(productsWithReviews);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

productRouter.get("/:id", async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT * FROM product WHERE product_id = ${req.params.id};`
    );
    if (result.rows[0]) {
      const product_reviews = await pool.query(
        `SELECT * FROM review WHERE product_id = ${req.params.id};`
      );
      res.send({ ...result.rows[0], reviews: product_reviews.rows });
    } else {
      res.status(404).send(`Product with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

productRouter.post("/", async (req, res, next) => {
  try {
    const { name, description, brand, image_url, price, category } = req.body;
    const result = await pool.query(
      `INSERT INTO product (name, description, brand, image_url, price, category) VALUES ('${name}', '${description}', '${brand}', '${image_url}', '${price}', '${category}') RETURNING *`
    );
    res.status(201).send(result.rows[0]);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

productRouter.put("/:id", async (req, res, next) => {
  try {
    const updateStatement = Object.entries(req.body)
      .map(([key, value]) => `${key} = '${value}'`)
      .join(", ");
    const updatedAt = moment().format("YYYY-MM-DD hh:mm:ss");
    const query = `UPDATE product SET ${updateStatement} ,updated_at='${updatedAt}' WHERE product_id = ${req.params.id} RETURNING *;`;
    const result = await pool.query(query);
    res.send(result.rows[0]);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

productRouter.delete("/:id", async (req, res, next) => {
  try {
    const query = `DELETE FROM product WHERE product_id = ${req.params.id};`;
    await pool.query(query);
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default productRouter;
