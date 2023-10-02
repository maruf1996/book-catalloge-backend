/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express'
import { AuthRoutes } from '../modules/auth/auth.route'
import { UserRoutes } from '../modules/user/user.route'

const router = express.Router()

const moduleRoutes: any[] = [
  { path: '/auth', route: AuthRoutes },
  { path: '/users', route: UserRoutes },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
