"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const chatSchema = new mongoose_1.Schema({
    members: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    messages: [
        {
            sender: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
            content: {
                text: { type: String },
                media: { type: String },
            },
        },
    ],
}, {
    timestamps: true,
});
chatSchema.methods.toJSON = function () {
    const chatDocument = this;
    const chatObject = chatDocument.toObject();
    delete chatObject.createdAt;
    // delete chatObject.updatedAt;
    delete chatObject.__v;
    return chatObject;
};
exports.default = (0, mongoose_1.model)("Chat", chatSchema);
