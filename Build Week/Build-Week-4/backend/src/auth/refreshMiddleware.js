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
const http_errors_1 = __importDefault(require("http-errors"));
const user_1 = __importDefault(require("../schemas/user"));
const refreshMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const refreshToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
    if (refreshToken) {
        console.log({ refreshToken });
        const user = yield user_1.default.findOne({ refreshToken });
        console.log({ user });
        if (user) {
            req.user = user.toJSON();
            next();
        }
        else {
            next((0, http_errors_1.default)(401, "Credentials are not ok!"));
        }
    }
    else {
        next((0, http_errors_1.default)(401, "Please provide credentials!"));
    }
});
exports.default = refreshMiddleware;
