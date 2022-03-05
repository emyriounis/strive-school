import express, { NextFunction, Request, Response } from "express";
import { ErrorType } from "./types/types";

const errorHandler = async (
  error: ErrorType,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  switch (error.status) {
    case 400:
      res.status(400).send(error.message || "Bad request");
      break;
    case 401:
      res.status(401).send(error.message || "Unauthorised");
      break;
    case 403:
      res.status(403).send(error.message || "Forbidden");
      break;
    case 404:
      res.status(404).send(error.message || "Not Found");
      break;
    default:
      console.log(error);
      res.status(500).send("Unknown server error");
  }
};

export default errorHandler;
