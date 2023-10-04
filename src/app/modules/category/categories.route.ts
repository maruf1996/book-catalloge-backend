import express from 'express'
import { ENUM_USER_ROLE } from '../../../enums/user'
import auth from '../../middleware/auth'
import { CategoriesController } from './categories.controller'

const router = express.Router()

router.post(
  '/create-category',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoriesController.createCategory,
)
router.get('/:id', CategoriesController.getCategory)
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoriesController.updateCategory,
)
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoriesController.deleteCategory,
)
router.get('/', CategoriesController.getCategories)

export const CategoriesRoutes = router
