import { NextFunction, Request, Response, Router } from "express";
import createHttpError from "http-errors";
import checkAuthMiddleware from "../auth/checkAuthMiddleware";
import chatModel from "../schemas/chat";

const chatRouter = Router();

chatRouter.get(
  "/",
  checkAuthMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const chats = await chatModel
        .find(
          {
            members: { $in: [req.userID] },
          }
          // { messages: 0 }
        )
        .populate("members", { username: 1, avatar: 1, updatedAt: 1 });

      res.send(chats);
    } catch (error) {
      next(error);
    }
  }
);

chatRouter.get(
  "/:chatId",
  checkAuthMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const chat = await chatModel.findById(req.params.chatId);

      if (chat) {
        if (chat.members.includes(req.userID)) {
          res.send(
            await chatModel
              .findById(req.params.chatId)
              .populate("members", { username: 1, avatar: 1 })
          );
        } else {
          next(createHttpError(403, "Unauthorized"));
        }
      } else {
        next(createHttpError(404, "not found"));
      }
    } catch (error) {
      next(createHttpError(400, "bad request"));
    }
  }
);

chatRouter.post(
  "/",
  checkAuthMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const chatExists = await chatModel.findOne({
        members: { $all: [req.userID, req.body.recipient] },
      });

      if (chatExists) {
        res.send(chatExists);
      } else {
        const newChat = new chatModel({
          members: [req.userID, req.body.recipient],
        });
        const createdChat = await newChat.save();
        res.status(201).send(createdChat);
      }
    } catch (error) {
      next(createHttpError(400, "bad request"));
    }
  }
);

export default chatRouter;
