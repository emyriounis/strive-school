import { Router } from "express";
import pool from "../../utils/db/connect.js";

const reviewRouter = Router();

reviewRouter.get("/", async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM review;");
    const products = await pool.query("SELECT * FROM product;");
    const reviewsWithProducts = result.rows.map((review) => {
      const single = {
        ...review,
        product: products.rows.find(
          (product) => product.product_id === review.product_id
        ),
      };
      return single;
    });
    res.send(reviewsWithProducts);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

reviewRouter.get("/:id", async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT * FROM review WHERE review_id = ${req.params.id};`
    );
    if (result.rows[0]) {
      const product = await pool.query(
        `SELECT * FROM product WHERE product_id = ${result.rows[0].product_id};`
      );
      res.send({ ...result.rows[0], product: product.rows[0] });
    } else {
      res.status(404).send(`Review with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

reviewRouter.post("/", async (req, res, next) => {
  try {
    const { comment, rate, product_id } = req.body;
    const result = await pool.query(
      `INSERT INTO review (comment, rate, product_id) VALUES ('${comment.replaceAll(
        "'",
        "`"
      )}', '${rate}', '${product_id}') RETURNING *`
    );
    res.status(201).send(result.rows[0]);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

reviewRouter.put("/:id", async (req, res, next) => {
  try {
    const updateStatement = Object.entries(req.body)
      .map(([key, value]) => `${key} = '${value}'`)
      .join(", ");
    const query = `UPDATE review SET ${updateStatement} WHERE review_id = ${req.params.id} RETURNING *;`;
    const result = await pool.query(query);
    res.send(result.rows[0]);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

reviewRouter.delete("/:id", async (req, res, next) => {
  try {
    const query = `DELETE FROM review WHERE review_id = ${req.params.id};`;
    await pool.query(query);
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default reviewRouter;
