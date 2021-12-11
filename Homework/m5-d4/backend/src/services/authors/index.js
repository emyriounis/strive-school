import express from "express";
import createHttpError from "http-errors";
import uniqid from "uniqid";
import { getAuthors, writeAuthors } from "../../lib/fs-tools.js";

const authorsRouter = express.Router();

authorsRouter.get("/", async (req, res) => {
  const authors = await getAuthors();
  res.send(authors);
});

authorsRouter.get("/:author", async (req, res, next) => {
  const authors = await getAuthors();
  const author = authors.find((author) => author.id === req.params.author);

  if (author) {
    res.send(author);
  } else {
    next(
      createHttpError(404, `Author with ID ${req.params.author} not found!`)
    );
  }
  res.send(author);
});

authorsRouter.post("/", async (req, res) => {
  const newAuthor = {
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date(),
    id: uniqid(),
    avatar: `https://ui-avatars.com/api/?name=${req.body.name}+${req.body.surname}`,
  };
  const authors = await getAuthors();
  authors.push(newAuthor);
  await writeAuthors(authors);
  res.status(201).send(newAuthor);
});

authorsRouter.put("/:author", async (req, res) => {
  const authors = await getAuthors();
  const index = authors.findIndex((author) => author.id === req.params.author);
  const updatedAuthor = {
    ...authors[index],
    ...req.body,
    updatedAt: new Date(),
  };
  authors[index] = updatedAuthor;
  await writeAuthors(authors);
  res.send(updatedAuthor);
});

authorsRouter.delete("/:author", async (req, res) => {
  const authors = await getAuthors();
  const remainingAuthors = authors.filter(
    (author) => author.id !== req.params.author
  );
  await writeAuthors(remainingAuthors);
  res.status(204).send();
});

export default authorsRouter;
