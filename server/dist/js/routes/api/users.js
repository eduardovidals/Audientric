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
const router = express_1.default.Router();
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users.
 *     description: Retrieve a list of users.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/user'
 */
router.get('', UserController.getUsers);
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a user.
 *     description: Creates a user that will be part of the class.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 required: true
 *                 description: the full name of the user
 *                 example: "Eduardo Vidals"
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/user'
 */
router.post('', UserController.createUser);
/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     summary: Delete a user by ID.
 *     description: Delete a user with the specified id from the database.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: id of the user to be deleted
 *         schema:
 *          type: string
 *     responses:
 *       200:
 *         description: A message specifying the user was successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successfully deleted user."
 */
router.delete("/:userId", UserController.deleteUser);
/**
 * @swagger
 * /users/{userId}/status:
 *   put:
 *     summary: Change the status of a user.
 *     description: Changes the status of the user with the specified userId.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         type: string
 *         name: userId
 *         required: true
 *         description: id of the user to be changed
 *         schema:
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 required: true
 *                 description: the status of the user
 *                 enum: [initial, done, issue]
 *     responses:
 *       200:
 *         description: The updated user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/user'
 */
router.put("/:userId/status", UserController.updateStatus);
/**
 * @swagger
 * /users/{userId}/issues:
 *   put:
 *     summary: Updates the user's issues.
 *     description: Adds an issue to the user's issues in the database.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: id of the user to be changed
 *         schema:
 *          type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               issue:
 *                 type: string
 *                 required: true
 *                 description: the issue to be added to the user
 *                 example: "I am having trouble with CSS."
 *     responses:
 *       200:
 *         description: The updated user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/user'
 */
router.put("/:userId/issues", UserController.updateIssues);
/**
 * @swagger
 * /users/{userId}/issues:
 *   put:
 *     summary: Updates the user's issues.
 *     description: Adds an issue to the user's issues in the database.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: id of the user to be changed
 *         schema:
 *          type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               issue:
 *                 type: string
 *                 required: true
 *                 description: the issue to be added to the user
 *                 example: "I am having trouble with CSS."
 *     responses:
 *       200:
 *         description: The updated user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/user'
 */
router.put("/:userId/answers", UserController.updateAnswers);
exports.default = router;
