import express from 'express'
import { UserProfileController } from './profile.controller'

const router = express.Router()

router.get('/', UserProfileController.getUsersProfile)

export const UserProfileRoutes = router
