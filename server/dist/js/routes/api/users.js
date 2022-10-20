"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController = __importStar(require("../../controllers/user"));
const router = (0, express_1.default)();
/**
 * @route GET api/users/test
 * @description tests books route
 * @access public
 */
router.get('/test', (req, res) => res.json({ message: 'user route testing!' }));
/**
 * @route GET api/users
 * @description Gets all current users in the class
 * @public
 */
router.get('/', UserController.getUsers);
/**
 * @route POST api/users
 * @description Creates a new user
 * @access public
 */
router.post("/", UserController.createUser);
/**
 * @route DELETE api/users
 * @description Deletes a user
 * @access public
 */ router.delete("/:id", UserController.deleteUser);
exports.default = router;
