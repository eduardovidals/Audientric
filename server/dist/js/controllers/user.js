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
exports.deleteUser = exports.createUser = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const socket_1 = __importDefault(require("../util/socket"));
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return user_1.default.find()
        .then(users => {
        return res.status(200).json({
            message: 'Successfully fetched users',
            users
        });
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
        // Sends message to all connected users
        socket_1.default.getInstance().emit("user event", {
            action: "add",
            user
        });
        return res.json({
            message: "Successfully created user.",
            user
        });
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
    user_1.default.findByIdAndRemove(req.params.id)
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
