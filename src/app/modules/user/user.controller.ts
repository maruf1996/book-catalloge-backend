import { NextFunction, Request, Response } from 'express'
import { UserService } from './user.service'

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserService.getUsers()
    res.status(200).json({
      status: 'success',
      message: 'User Retrive successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const result = await UserService.getUser(id)
    res.status(200).json({
      status: 'success',
      message: 'User getched successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const { ...data } = req.body
    const result = await UserService.updateUser(id, data)
    res.status(200).json({
      status: 'success',
      message: 'User updated successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const result = await UserService.deleteUser(id)
    res.status(200).json({
      status: 'success',
      message: 'Uers deleted successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const UserController = { getUsers, getUser, updateUser, deleteUser }
