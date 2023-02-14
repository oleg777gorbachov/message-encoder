"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    message: {
        type: {
            iv: String,
            content: String,
        },
        required: true,
    },
    author: {
        type: String,
        required: false,
        default: "Unknown",
    },
    password: {
        type: String,
        required: false,
    },
    views: {
        type: Number,
        required: false,
        default: 0,
    },
    maxViews: {
        type: Number,
        required: false,
        default: 1,
    },
    isEditableByOther: {
        type: Boolean,
        required: false,
        default: false,
    },
    code: {
        type: String,
        required: true,
    },
    date: { type: Number, required: true },
});
exports.default = (0, mongoose_1.model)("messages", messageSchema);
