import express from 'express'
import { ENUM_USER_ROLE } from '../../../enums/user'
import auth from '../../middleware/auth'
import { BooksController } from './book.controller'

const router = express.Router()

router.post(
  '/create-book',
  auth(ENUM_USER_ROLE.ADMIN),
  BooksController.createBook,
)
router.get('/:id', BooksController.getBook)
router.get('/:categoryId/category', BooksController.getBooksByCategoryId)
router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), BooksController.updateBook)
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), BooksController.deleteBook)
router.get('/', BooksController.getBooks)

export const BooksRoutes = router
