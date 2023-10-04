import { NextFunction, Request, Response } from 'express'
import { OrderService } from './orders.service'

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers?.authorization
    const data = req.body
    const result = await OrderService.createOrder(data, token as string)
    res.status(200).json({
      status: 'success',
      message: 'Order created successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers?.authorization
    const result = await OrderService.getOrders(token as string)
    res.status(200).json({
      status: 'success',
      message: 'Orders Retrive successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const getOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params?.orderId
    const token = req.headers?.authorization
    const result = await OrderService.getOrder(id, token as string)
    res.status(200).json({
      status: 'success',
      message: 'Order getched successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const OrderController = {
  createOrder,
  getOrders,
  getOrder,
}
