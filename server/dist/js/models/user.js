"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    fullName: { type: String, required: true },
    issues: { type: [String], default: [] },
    status: { type: String, default: 'initial', enum: ['initial', 'done', 'issue'] },
    answers: { type: [String], default: [] },
    updatedAt: { type: Date }
});
exports.default = (0, mongoose_1.model)('User', UserSchema);
