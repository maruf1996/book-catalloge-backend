/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express'
import { AuthRoutes } from '../modules/auth/auth.route'
import { BooksRoutes } from '../modules/book/book.route'
import { CategoriesRoutes } from '../modules/category/categories.route'
import { UserRoutes } from '../modules/user/user.route'

const router = express.Router()

const moduleRoutes: any[] = [
  { path: '/auth', route: AuthRoutes },
  { path: '/users', route: UserRoutes },
  { path: '/categories', route: CategoriesRoutes },
  { path: '/books', route: BooksRoutes },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
