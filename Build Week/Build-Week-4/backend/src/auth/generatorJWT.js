"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generatorJWT = (_id, expiresIn) => new Promise((resolve, reject) => jsonwebtoken_1.default.sign({ _id }, process.env.JWT_SECRET, { expiresIn }, (err, token) => {
    if (err)
        reject(err);
    else
        resolve(token);
}));
exports.default = generatorJWT;
