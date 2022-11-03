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
exports.joinClass = exports.updateStatus = exports.getClassUsers = exports.getClassById = exports.createClass = void 0;
const socket_1 = __importDefault(require("../util/socket"));
const class_1 = __importDefault(require("../models/class"));
const user_1 = __importDefault(require("../models/user"));
const mongoose_1 = require("mongoose");
const createClass = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    class_1.default.create(req.body)
        .then(classObj => {
        return res.json(classObj);
    })
        .catch(e => {
        return res.status(404).send({
            error: e.message,
            message: 'Unable to create class.'
        });
    });
    ;
});
exports.createClass = createClass;
const getClassById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    class_1.default.findById(req.params.classId)
        .then(classObj => {
        return res.json(classObj);
    })
        .catch(e => {
        return res.status(404).send({
            error: e.message,
            message: `Class with ID of ${req.params.classId} does not exist.`
        });
    });
});
exports.getClassById = getClassById;
const getClassUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const classObj = yield class_1.default.findById(req.params.classId);
    if (!classObj)
        throw Error("Class does not exist.");
    user_1.default.find({ "_id": { $in: classObj.users } }).sort({ updatedAt: -1 })
        .then(users => res.json(users))
        .catch(e => {
        return res.status(404).send({
            error: e.message,
            message: 'Unable to get a user from the list.'
        });
    });
});
exports.getClassUsers = getClassUsers;
const updateStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { classId } = req.params;
    const { status } = req.body;
    const classObj = yield class_1.default.findByIdAndUpdate(classId, { status }, { new: true });
    if (!classObj)
        throw Error("Class does not exist.");
    user_1.default.updateMany({ "_id": { $in: classObj.users } }, { $set: { status: 'initial' } }, { new: true })
        .sort({ updatedAt: -1 })
        .then(users => res.json(users))
        .catch(e => {
        return res.status(404).send({
            error: e.message,
            message: 'Unable to get a user from the list.'
        });
    });
    socket_1.default.getInstance().emit("class event", {
        action: "status",
        status
    });
    return res.json(classObj);
});
exports.updateStatus = updateStatus;
const joinClass = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { classId } = req.params;
        const { userId } = req.body;
        const user = yield user_1.default.findById(userId);
        if (!user) {
            new Error('User cannot be found.');
        }
        const classObj = yield class_1.default.findByIdAndUpdate(classId, {
            $push: {
                "users": mongoose_1.Types.ObjectId(user === null || user === void 0 ? void 0 : user._id)
            }
        }, { new: true });
        socket_1.default.getInstance().emit("class event", {
            action: "join",
            user
        });
        return res.json(classObj);
    }
    catch (e) {
        return res.status(404).send({
            error: e.message,
            message: 'Unable to join class.'
        });
    }
});
exports.joinClass = joinClass;
