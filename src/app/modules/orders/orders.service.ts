import httpStatus from 'http-status'
import { Secret } from 'jsonwebtoken'
import ApiError from '../../../Errors/ApiError'
import config from '../../../config'
import { ENUM_USER_ROLE } from '../../../enums/user'
import { jwtHelpers } from '../../Helpers/jwtHelpers'
import { prisma } from '../../shared/prisma'
import { IOrderRequest } from './orders.interface'

const createOrder = async (data: IOrderRequest, token: string) => {
  let decodedToken
  try {
    decodedToken = jwtHelpers.verifyToken(token, config.jwt.secret as Secret)
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid access Token')
  }

  const orderData = {
    userId: decodedToken.userId,
    ...data,
  }

  // console.log(orderData)
  const result = await prisma.order.create({
    data: orderData,
  })

  return result
}

const getOrders = async (token: string) => {
  let decodedToken
  try {
    decodedToken = jwtHelpers.verifyToken(token, config.jwt.secret as Secret)
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid access Token')
  }

  const isUserExist = await prisma.user.findUnique({
    where: {
      id: decodedToken.userId,
    },
  })

  //
  if (!isUserExist) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User is not Exist')
  }

  let result = null

  if (isUserExist && isUserExist?.role === ENUM_USER_ROLE.CUSTOMER) {
    result = await prisma.order.findMany({
      where: {
        userId: decodedToken.userId,
      },
      select: {
        id: true,
        status: true,
        userId: true,
        user: {
          select: {
            id: true,
            name: true,
            address: true,
            email: true,
            contactNo: true,
            role: true,
          },
        },
        orderedBooks: true,
      },
    })
  }
  if (isUserExist && isUserExist?.role === ENUM_USER_ROLE.ADMIN) {
    result = await prisma.order.findMany({
      select: {
        id: true,
        status: true,
        userId: true,
        user: {
          select: {
            id: true,
            name: true,
            address: true,
            email: true,
            contactNo: true,
            role: true,
          },
        },
        orderedBooks: true,
      },
    })
  }

  if (!result?.length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No Orders Found !!')
  }

  return result
}

const getOrder = async (id: string, token: string) => {
  let decodedToken
  try {
    decodedToken = jwtHelpers.verifyToken(token, config.jwt.secret as Secret)
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid access Token')
  }
  const isUserExist = await prisma.user.findUnique({
    where: {
      id: decodedToken.userId,
    },
  })

  // console.log(id)

  //
  if (!isUserExist) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User is not Exist')
  }

  let result = null
  if (isUserExist && isUserExist.role === ENUM_USER_ROLE.ADMIN) {
    result = await prisma.order.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        status: true,
        userId: true,
        user: {
          select: {
            id: true,
            name: true,
            address: true,
            email: true,
            contactNo: true,
            role: true,
          },
        },
        orderedBooks: true,
      },
    })
  }
  if (isUserExist && isUserExist.role === ENUM_USER_ROLE.CUSTOMER) {
    result = await prisma.order.findUnique({
      where: {
        id,
        userId: decodedToken.userId,
      },
      select: {
        id: true,
        status: true,
        userId: true,
        user: {
          select: {
            id: true,
            name: true,
            address: true,
            email: true,
            contactNo: true,
            role: true,
          },
        },
        orderedBooks: true,
      },
    })
  }

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You are not Authorized User !!')
  }

  return result
}

export const OrderService = {
  createOrder,
  getOrders,
  getOrder,
}
