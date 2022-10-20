import express from "express";
import Book from '../../models/book';

const router = express();

/**
 * @route GET api/books/test
 * @description tests books route
 * @access Public
 */
router.get('/test', (req, res) => res.json({message: 'book route testing!'}));

/**
 * @route GET api/books
 * @description Get all books
 * @access Public
 */
router.get('/', async (req, res) => {
  const books = Book.find()
    .then(books => res.json(books))
    .catch(e => res.status(404).json({nobooksfound: 'No Books found', message: e.message}));
});

/**
 * @route GET api/books/:id
 * @description Get single book by id
 * @access Public
 */
router.get('/:id', (req, res) => {
  Book.findById(req.params.id)
    .then(book => res.json(book))
    .catch(e => res.status(404).json({nobookfound: 'No Book found', message: e.message}));
});

/**
 * @route POST api/books
 * @description add/save book
 * @access Public
 */
router.post('/', (req, res) => {
  console.log("HERE IS BODY: " + JSON.stringify(req.body))
  Book.create(req.body)
    .then(book => res.json(book))
    .catch(e => {
      console.log(JSON.stringify(e));
      res.status(400).json({error: 'Unable to add this book', message: JSON.stringify(e)})
    });
});

/**
 * @route PUT api/books/:id
 * @description Update book
 * @access Public
 */
router.put('/:id', (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body)
    .then(book => res.json({msg: 'Updated successfully'}))
    .catch(e => res.status(400).json({error: 'Unable to update the Database'}));
});

/**
 * @route DELETE api/books/:id
 * @description Delete book by id
 * @access Public
 */
router.delete('/:id', (req, res) => {
  Book.findByIdAndRemove(req.params.id)
    .then(() => res.json({
      message: 'User successfully deleted.'
    }))
    .catch(e => res.status(404).json({error: 'No such a book'}));
});

export default router;
