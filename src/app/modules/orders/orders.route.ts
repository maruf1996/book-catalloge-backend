import express from 'express'
import { OrderController } from './orders.controller'

const router = express.Router()

router.post('/create-order', OrderController.createOrder)
router.get('/:id', OrderController.getOrder)
router.get('/', OrderController.getOrders)

export const OrderRoutes = router
