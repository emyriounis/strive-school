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
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    refreshToken: { type: String },
}, {
    timestamps: true,
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        const plainPassword = user.password;
        if (user.isModified("password")) {
            const encryptedPassword = yield bcrypt_1.default.hash(plainPassword, 10);
            user.password = encryptedPassword;
        }
        next();
    });
});
userSchema.methods.toJSON = function () {
    const userDocument = this;
    const userObject = userDocument.toObject();
    delete userObject.password;
    delete userObject.refreshToken;
    delete userObject.createdAt;
    delete userObject.updatedAt;
    delete userObject.__v;
    return userObject;
};
userSchema.statics.authenticate = function (identifier, plainPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = (yield this.findOne({ email: identifier })) ||
            (yield this.findOne({ username: identifier }));
        if (user) {
            const isMatch = yield bcrypt_1.default.compare(plainPassword, user.password);
            if (isMatch) {
                return user;
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    });
};
exports.default = (0, mongoose_1.model)("User", userSchema);
