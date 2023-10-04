import { NextFunction, Request, Response } from 'express'
import { UserProfileService } from './profile.service'

const getUsersProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers?.authorization
    const result = await UserProfileService.getUserProfile(token as string)

    res.status(200).json({
      status: 'success',
      message: 'Profile retrieved in successfully!',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const UserProfileController = {
  getUsersProfile,
}
