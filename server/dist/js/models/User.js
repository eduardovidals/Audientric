"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    fullName: { type: String, required: true },
    issues: [String],
    status: String
});
exports.default = (0, mongoose_1.model)('user', UserSchema);
