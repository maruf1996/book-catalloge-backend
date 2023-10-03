import { NextFunction, Request, Response } from 'express'
import { OrderService } from './orders.service'

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ...data } = req.body
    const result = await OrderService.createOrder(data)
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
    const result = await OrderService.getOrders()
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
    const { id } = req.params
    const result = await OrderService.getOrder(id)
    res.status(200).json({
      status: 'success',
      message: 'Order getched successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const { ...data } = req.body
    const result = await OrderService.updateOrder(id, data)
    res.status(200).json({
      status: 'success',
      message: 'Order updated successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const result = await OrderService.deleteOrder(id)
    res.status(200).json({
      status: 'success',
      message: 'Order deleted successfully',
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
  updateOrder,
  deleteOrder,
}
