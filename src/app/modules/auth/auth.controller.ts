import { NextFunction, Request, Response } from 'express'
import { AuthService } from './auth.service'

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ...userData } = req.body
    const result = await AuthService.createUser(userData)
    res.status(200).json({
      status: 'success',
      message: 'User created successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const AuthController = { createUser }
