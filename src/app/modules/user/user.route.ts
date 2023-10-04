import express from 'express'
import { ENUM_USER_ROLE } from '../../../enums/user'
import auth from '../../middleware/auth'
import { UserController } from './user.controller'

const router = express.Router()

router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getUser)
router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.updateUser)
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.deleteUser)
router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getUsers)

export const UserRoutes = router
