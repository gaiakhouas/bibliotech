import {Router} from 'express';
import UserController from "./controllers/UserController";
import GenreController from "./controllers/GenreController";
import CategoryController from "./controllers/CategoryController";
import BookController from "./controllers/BookController";
import Multer from "./utils/Multer";
import Auth from "./utils/Auth";
import Book from "./models/Book";
import Category from './models/Category';
import Genre from './models/Genre';

const router = Router();

/**
 * Users
 */


router.get('/users', Auth.isAllowed([10]), UserController.list);
router.get('/users/:id', UserController.details);
router.post('/users/auth', UserController.auth);
router.post('/users', UserController.store);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.remove);

/**
 * Genres
 */
router.get('/genres', async (req, res) => {
  const genre = await Genre.find();
  if (genre) res.send(genre);

});
router.post('/genres', GenreController.store);
router.put('/genres/:id', GenreController.update);
router.delete('/genres/:id', GenreController.remove);

/**
 * Category
 */

router.get('/category', async (req, res) => {

    const category = await Category.find();
    if (category) res.send(category);
  
});
router.post('/category', CategoryController.store);
router.put('/category/:id', CategoryController.update);
router.delete('/category/:id', CategoryController.remove);


/**
 * Book
 */

router.post('/book', Multer.upload('book', 'thumbnail'), BookController.store);
router.get('/book', async (req, res) => {
    if (req.user) {
      const books = await Book.find({ userId: req.user._id });
      if (books) res.send(books);
    }
  });

router.get('/book/:id', BookController.details);
router.delete('/book/:id', BookController.remove);
router.put('/book/:id', BookController.update);
router.put('/book/:id/thumbnail', Multer.upload('book', 'thumbnail'), BookController.updateThumbnail);


export default router;
