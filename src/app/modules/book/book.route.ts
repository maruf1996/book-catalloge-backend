import express from 'express'
import { BooksController } from './book.controller'

const router = express.Router()

router.post('/create-book', BooksController.createBook)
router.get('/:id', BooksController.getBook)
router.get('/:categoryId/category', BooksController.getBooksByCategoryId)
router.patch('/:id', BooksController.updateBook)
router.delete('/:id', BooksController.deleteBook)
router.get('/', BooksController.getBooks)

export const BooksRoutes = router
