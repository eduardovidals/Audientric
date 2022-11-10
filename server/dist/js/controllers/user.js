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
exports.updateIssues = exports.updateStatus = exports.deleteUser = exports.createUser = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const socket_1 = __importDefault(require("../util/socket"));
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return user_1.default.find().sort({ createdAt: -1 })
        .then(users => {
        return res.status(200).json(users);
    })
        .catch(e => {
        return res.status(404).send({
            error: e.message,
            message: "Unable to get users."
        });
    });
});
exports.getUsers = getUsers;
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    user_1.default.create(req.body)
        .then(user => {
        // ends message to all connected users
        socket_1.default.getInstance().emit("user event", {
            action: "add",
            user
        });
        return res.json(user);
    })
        .catch(e => {
        return res.status(404).send({
            error: e.message,
            message: 'Unable to create user.'
        });
    });
});
exports.createUser = createUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    user_1.default.findByIdAndRemove(req.params.userId)
        .then(() => {
        return res.json({
            message: 'Successfully deleted user.'
        });
    })
        .catch(e => {
        return res.status(404).send({
            error: e.message,
            message: 'Unable to delete user.'
        });
    });
});
exports.deleteUser = deleteUser;
const updateStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { status } = req.body;
    user_1.default.findByIdAndUpdate(userId, { status, updatedAt: new Date(new Date().toISOString()) }, { new: true, runValidators: true })
        .then(user => {
        socket_1.default.getInstance().emit("user event", {
            action: "updateStatus",
            status,
            userId
        });
        return res.json(user);
    })
        .catch(e => {
        return res.status(404).send({
            error: e.message,
            message: "Unable to update user's status."
        });
    });
});
exports.updateStatus = updateStatus;
const updateIssues = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { issue } = req.body;
    user_1.default.findByIdAndUpdate(userId, {
        $push: {
            "issues": issue
        },
        updatedAt: new Date(new Date().toISOString())
    }, { new: true })
        .then(user => {
        socket_1.default.getInstance().emit("user event", {
            action: "updateIssues",
            issue,
            user
        });
        return res.json(user);
    })
        .catch(e => {
        return res.status(404).send({
            error: e.message,
            message: "Unable to update user's issues."
        });
    });
});
exports.updateIssues = updateIssues;
