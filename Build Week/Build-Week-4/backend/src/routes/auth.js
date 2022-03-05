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
const checkAuthMiddleware_1 = __importDefault(require("../auth/checkAuthMiddleware"));
const loginMiddleware_1 = __importDefault(require("../auth/loginMiddleware"));
const providerJWT_1 = __importDefault(require("../auth/providerJWT"));
const refreshMiddleware_1 = __importDefault(require("../auth/refreshMiddleware"));
const user_1 = __importDefault(require("../schemas/user"));
const authRouter = (0, express_1.Router)();
authRouter.post("/account", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, username } = req.body;
        const newUser = new user_1.default({
            email,
            username,
            password,
        });
        const createdUser = yield newUser.save();
        console.log(createdUser);
        req.user = createdUser.toJSON();
        next();
    }
    catch (error) {
        next(error);
    }
}), providerJWT_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(Object.assign({ user: Object.assign({}, req.user) }, req.tokens));
    }
    catch (error) {
        next(error);
    }
}));
authRouter.post("/session", loginMiddleware_1.default, providerJWT_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(req.tokens);
    }
    catch (error) {
        next(error);
    }
}));
authRouter.post("/session/refresh", refreshMiddleware_1.default, providerJWT_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(req.tokens);
    }
    catch (error) {
        next(error);
    }
}));
authRouter.delete("/session", checkAuthMiddleware_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loggedOutUser = yield user_1.default.findByIdAndUpdate(req.userID, {
            refreshToken: "",
        });
        res.status(204).send();
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
}));
exports.default = authRouter;
