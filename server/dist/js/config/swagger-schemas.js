"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_to_swagger_1 = __importDefault(require("mongoose-to-swagger"));
const user_1 = __importDefault(require("../models/user"));
const class_1 = __importDefault(require("../models/class"));
exports.default = {
    user: (0, mongoose_to_swagger_1.default)(user_1.default),
    class: (0, mongoose_to_swagger_1.default)(class_1.default)
};
