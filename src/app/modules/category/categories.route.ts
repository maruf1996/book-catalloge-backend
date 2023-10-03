import express from 'express'
import { CategoriesController } from './categories.controller'

const router = express.Router()

router.post('/create-category', CategoriesController.createCategory)
router.get('/:id', CategoriesController.getCategory)
router.patch('/:id', CategoriesController.updateCategory)
router.delete('/:id', CategoriesController.deleteCategory)
router.get('/', CategoriesController.getCategories)

export const CategoriesRoutes = router
