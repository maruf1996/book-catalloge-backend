import express from 'express'
import { UserController } from './user.controller'

const router = express.Router()

router.get('/:id', UserController.getUser)
router.patch('/:id', UserController.updateUser)
router.delete('/:id', UserController.deleteUser)
router.get('/', UserController.getUsers)

export const UserRoutes = router
