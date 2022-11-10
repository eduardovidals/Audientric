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
const ClassController = __importStar(require("../../controllers/class"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
/**
 * @swagger
 * /classes:
 *   post:
 *     summary: Creates a class.
 *     description: Creates a class that will be able to help students.
 *     tags: [Classes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hostId:
 *                 type: string
 *                 required: true
 *                 description: the userId of the user hosting the class
 *                 example: "6351a813b9f96f7f148029c7"
 *     responses:
 *       200:
 *         description: The created class.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/class'
 */
router.post('/', ClassController.createClass);
/**
 * @swagger
 * /classes/{classId}:
 *   get:
 *     summary: Retrieves a class by id
 *     description: Retrieves a class by id
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         type: string
 *         name: classId
 *         required: true
 *         description: id of the class
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The class.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/class'
 */
router.get('/:classId', ClassController.getClassById);
/**
 * @swagger
 * /classes/{classId}/users:
 *   get:
 *     summary: Retrieves the users of a class
 *     description: Retrieves the users of a class using the class id
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         type: string
 *         name: classId
 *         required: true
 *         description: id of the class
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The array of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/user'
 */
router.get('/:classId/users', ClassController.getClassUsers);
/**
 * @swagger
 * /classes/{classId}/task:
 *   put:
 *     summary: Change the task of a class.
 *     description: Changes the task of the class with the specified classId.
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         description: id of the class to be changed
 *         schema:
 *          type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               task:
 *                 type: string
 *                 required: true
 *                 description: the status of the class
 *     responses:
 *       200:
 *         description: The updated class.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/class'
 */
router.put('/:classId/task', ClassController.updateTask);
/**
 * @swagger
 * /classes/{classId}/status:
 *   put:
 *     summary: Change the status of a class.
 *     description: Changes the status of the class with the specified classId.
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         description: id of the class to be changed
 *         schema:
 *          type: string
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
 *                 description: the status of the class
 *                 enum: [initial, started, ended]
 *     responses:
 *       200:
 *         description: The updated class.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/class'
 */
router.put('/:classId/status', ClassController.updateStatus);
/**
 * @swagger
 * /classes/{classId}/users:
 *   put:
 *     summary: Allows a user to join a class
 *     description: Allows a user to join a class by using their respective userId & classId
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         description: id of the class that is being joined
 *         schema:
 *          type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 required: true
 *                 description: id of the user that is joining the class
 *                 example: "6351a813b9f96f7f148029c7"
 *     responses:
 *       200:
 *         description: The updated class.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/class'
 */
router.put('/:classId/users', ClassController.joinClass);
exports.default = router;
