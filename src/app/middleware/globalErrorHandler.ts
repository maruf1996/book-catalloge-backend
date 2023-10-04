/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import ApiError from '../../Errors/ApiError'
import config from '../../config'

export const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500
  let message =
    config.env === 'development' ? error.message : 'something went wrong'
  const errorName = config.env === 'development' && error.name

  if (config.env === 'development') {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      statusCode = 400
      const lines = error.message.trim().split('\n')
      message = lines[lines.length - 1]
    } else if (error instanceof Prisma.PrismaClientValidationError) {
      statusCode = 400
      const lines = error.message.trim().split('\n')
      message = lines[lines.length - 1]
    } else if (error instanceof Error) {
      statusCode = httpStatus.INTERNAL_SERVER_ERROR
      message = error.message
    } else if (error instanceof ApiError) {
      statusCode = error?.statusCode
      message = error.message
    }
  }

  res.status(statusCode).json({
    errorName,
    success: false,
    message,
    // stack: error.stack,
  })
}
