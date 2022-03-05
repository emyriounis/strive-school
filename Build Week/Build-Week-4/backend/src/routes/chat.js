"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_errors_1 = __importDefault(require("http-errors"));
const checkAuthMiddleware_1 = __importDefault(require("../auth/checkAuthMiddleware"));
const chat_1 = __importDefault(require("../schemas/chat"));
const chatRouter = (0, express_1.Router)();
chatRouter.get("/", checkAuthMiddleware_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chats = yield chat_1.default
            .find({
            members: { $in: [req.userID] },
        }
        // { messages: 0 }
        )
            .populate("members", { username: 1, avatar: 1, updatedAt: 1 });
        res.send(chats);
    }
    catch (error) {
        next(error);
    }
}));
chatRouter.get("/:chatId", checkAuthMiddleware_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chat = yield chat_1.default.findById(req.params.chatId);
        if (chat) {
            if (chat.members.includes(req.userID)) {
                res.send(yield chat_1.default
                    .findById(req.params.chatId)
                    .populate("members", { username: 1, avatar: 1 }));
            }
            else {
                next((0, http_errors_1.default)(403, "Unauthorized"));
            }
        }
        else {
            next((0, http_errors_1.default)(404, "not found"));
        }
    }
    catch (error) {
        next((0, http_errors_1.default)(400, "bad request"));
    }
}));
chatRouter.post("/", checkAuthMiddleware_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chatExists = yield chat_1.default.findOne({
            members: { $all: [req.userID, req.body.recipient] },
        });
        if (chatExists) {
            res.send(chatExists);
        }
        else {
            const newChat = new chat_1.default({
                members: [req.userID, req.body.recipient],
            });
            const createdChat = yield newChat.save();
            res.status(201).send(createdChat);
        }
    }
    catch (error) {
        next((0, http_errors_1.default)(400, "bad request"));
    }
}));
exports.default = chatRouter;
