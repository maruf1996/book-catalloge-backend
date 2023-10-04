import httpStatus from 'http-status'
import { Secret } from 'jsonwebtoken'
import ApiError from '../../../Errors/ApiError'
import config from '../../../config'
import { jwtHelpers } from '../../Helpers/jwtHelpers'
import { prisma } from '../../shared/prisma'
import { IMyProfile } from './profile.interface'

const getUserProfile = async (token: string): Promise<IMyProfile | null> => {
  let decodedToken
  try {
    decodedToken = jwtHelpers.verifyToken(token, config.jwt.secret as Secret)
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token')
  }

  const { userId } = decodedToken

  const result = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  })

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not Found')
  }

  return result
}

export const UserProfileService = {
  getUserProfile,
}
