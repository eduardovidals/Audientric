"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BookSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    isbn: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String },
    published_date: { type: Date },
    publisher: { type: String },
    updated_date: { type: Date, default: Date.now }
});
exports.default = (0, mongoose_1.model)('book', BookSchema);
