import express from 'express'
import { ENUM_USER_ROLE } from '../../../enums/user'
import auth from '../../middleware/auth'
import { OrderController } from './orders.controller'

const router = express.Router()

router.post(
  '/create-order',
  auth(ENUM_USER_ROLE.CUSTOMER),
  OrderController.createOrder,
)
router.get(
  '/:orderId',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  OrderController.getOrder,
)
router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  OrderController.getOrders,
)

export const OrderRoutes = router
