import express from "express";
import * as UserController from '../../controllers/user';

const router = express();

/**
 * @route GET api/users/test
 * @description tests books route
 * @access public
 */
router.get('/test', (req, res) => res.json({message: 'user route testing!'}));

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
 */router.delete("/:id", UserController.deleteUser);

export default router;
