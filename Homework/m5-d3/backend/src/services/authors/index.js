import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";

const authorsRouter = express.Router();

const currentFilePath = fileURLToPath(import.meta.url);
const currentFolderPath = dirname(currentFilePath);
const authorsJSONPath = join(currentFolderPath, "authors.json");

authorsRouter.get("/", (req, res) => {
  const authors = JSON.parse(fs.readFileSync(authorsJSONPath));
  res.send(authors);
});

authorsRouter.get("/:author", (req, res) => {
  const authors = JSON.parse(fs.readFileSync(authorsJSONPath));
  const author =
    authors.find((author) => author.id === req.params.author) || "no author";
  res.send(author);
});

authorsRouter.post("/", (req, res) => {
  console.log(req.body);
  const newAuthor = {
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date(),
    id: uniqid(),
    avatar: `https://ui-avatars.com/api/?name=${req.body.name}+${req.body.surname}`,
  };
  const authors = JSON.parse(fs.readFileSync(authorsJSONPath));
  authors.push(newAuthor);
  fs.writeFileSync(authorsJSONPath, JSON.stringify(authors));
  res.status(201).send(newAuthor);
});

authorsRouter.put("/:author", (req, res) => {
  const authors = JSON.parse(fs.readFileSync(authorsJSONPath));
  const index = authors.findIndex((author) => author.id === req.params.authors);
  const updatedAuthor = {
    ...authors[index],
    ...req.body,
    updatedAt: new Date(),
  };
  authors[index] = updatedAuthor;
  fs.writeFileSync(authorsJSONPath, JSON.stringify(authors));
  res.send(updatedAuthor);
});

authorsRouter.delete("/:author", (req, res) => {
  const authors = JSON.parse(fs.readFileSync(authorsJSONPath));
  const remainingAuthors = authors.filter(
    (author) => author.id !== req.params.author
  );
  fs.writeFileSync(authorsJSONPath, JSON.stringify(remainingAuthors));
  res.status(204).send();
});

export default authorsRouter;
