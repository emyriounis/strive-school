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
const user_1 = __importDefault(require("../schemas/user"));
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
require("dotenv").config();
const userRouter = (0, express_1.Router)();
const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;
cloudinary_1.v2.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_KEY,
    api_secret: CLOUDINARY_SECRET,
});
const multerOpts = {
    cloudinary: cloudinary_1.v2,
    params: {
        folder: "whatsapp-avatars",
    },
};
const storage = new multer_storage_cloudinary_1.CloudinaryStorage(multerOpts);
const avatarUpload = (0, multer_1.default)({ storage }).single("avatar");
userRouter.get("/", checkAuthMiddleware_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search } = req.query;
        const query = search
            ? {
                $or: [
                    { email: { $regex: search } },
                    { username: { $regex: search } },
                ],
            }
            : {};
        // const query =
        const users = yield user_1.default.find(query).limit(5);
        res.send(users);
    }
    catch (error) {
        next(error);
    }
}));
userRouter.get("/me", checkAuthMiddleware_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(req.userID);
        if (user) {
            res.send(user);
        }
        else {
            next((0, http_errors_1.default)(404, "Not found"));
        }
    }
    catch (error) {
        next(error);
    }
}));
userRouter.put("/me", checkAuthMiddleware_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield user_1.default.findByIdAndUpdate(req.userID, req.body);
        if (updatedUser) {
            res.status(204).send();
        }
        else {
            next((0, http_errors_1.default)(404, "Not found"));
        }
    }
    catch (error) {
        next(error);
    }
}));
userRouter.post("/me/avatar", checkAuthMiddleware_1.default, avatarUpload, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.file) {
            const updatedUser = yield user_1.default.findByIdAndUpdate(req.userID, {
                avatar: req.file.path,
            });
            if (updatedUser) {
                res.status(204).send();
            }
            else {
                next((0, http_errors_1.default)(404, "Not found"));
            }
        }
        else {
            next((0, http_errors_1.default)(400, "No avatar provided"));
        }
    }
    catch (error) {
        next((0, http_errors_1.default)(400, "bad request"));
        next(error);
    }
}));
userRouter.get("/:userId", checkAuthMiddleware_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(req.params.userId);
        console.log(user);
        if (user) {
            res.send(user);
        }
        else {
            next((0, http_errors_1.default)(404, "Not found"));
        }
    }
    catch (error) {
        next((0, http_errors_1.default)(400, "Invalid ID supplied"));
    }
}));
exports.default = userRouter;
