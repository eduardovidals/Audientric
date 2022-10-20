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
const express_1 = __importDefault(require("express"));
const book_1 = __importDefault(require("../../models/book"));
const router = (0, express_1.default)();
/**
 * @route GET api/books/test
 * @description tests books route
 * @access Public
 */
router.get('/test', (req, res) => res.json({ message: 'book route testing!' }));
/**
 * @route GET api/books
 * @description Get all books
 * @access Public
 */
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = book_1.default.find()
        .then(books => res.json(books))
        .catch(e => res.status(404).json({ nobooksfound: 'No Books found', message: e.message }));
}));
/**
 * @route GET api/books/:id
 * @description Get single book by id
 * @access Public
 */
router.get('/:id', (req, res) => {
    book_1.default.findById(req.params.id)
        .then(book => res.json(book))
        .catch(e => res.status(404).json({ nobookfound: 'No Book found', message: e.message }));
});
/**
 * @route POST api/books
 * @description add/save book
 * @access Public
 */
router.post('/', (req, res) => {
    console.log("HERE IS BODY: " + JSON.stringify(req.body));
    book_1.default.create(req.body)
        .then(book => res.json(book))
        .catch(e => {
        console.log(JSON.stringify(e));
        res.status(400).json({ error: 'Unable to add this book', message: JSON.stringify(e) });
    });
});
/**
 * @route PUT api/books/:id
 * @description Update book
 * @access Public
 */
router.put('/:id', (req, res) => {
    book_1.default.findByIdAndUpdate(req.params.id, req.body)
        .then(book => res.json({ msg: 'Updated successfully' }))
        .catch(e => res.status(400).json({ error: 'Unable to update the Database' }));
});
/**
 * @route DELETE api/books/:id
 * @description Delete book by id
 * @access Public
 */
router.delete('/:id', (req, res) => {
    book_1.default.findByIdAndRemove(req.params.id)
        .then(() => res.json({
        message: 'User successfully deleted.'
    }))
        .catch(e => res.status(404).json({ error: 'No such a book' }));
});
exports.default = router;
