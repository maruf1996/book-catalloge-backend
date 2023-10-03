import { Order } from '@prisma/client'
import { prisma } from '../../shared/prisma'

const createOrder = async (data: Order): Promise<Order | null> => {
  const result = await prisma.order.create({ data })
  return result
}

const getOrders = async (): Promise<Order[] | null> => {
  const result = await prisma.order.findMany({
    include: {
      user: true,
    },
  })
  return result
}

const getOrder = async (id: string): Promise<Order | null> => {
  const result = await prisma.order.findUnique({
    where: { id },
    include: {
      user: true,
    },
  })
  return result
}

const updateOrder = async (
  id: string,
  payload: Partial<Order>,
): Promise<Partial<Order> | null> => {
  const result = await prisma.order.update({
    where: { id },
    data: payload,
  })
  return result
}

const deleteOrder = async (id: string) => {
  const result = await prisma.order.delete({
    where: { id },
  })
  return result
}

export const OrderService = {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
}
