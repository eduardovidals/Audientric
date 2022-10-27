"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ClassSchema = new mongoose_1.Schema({
    users: { type: [String], default: [] },
    status: { type: String, default: 'initial' },
    hostId: { type: String, required: true }
});
exports.default = (0, mongoose_1.model)('Class', ClassSchema);
