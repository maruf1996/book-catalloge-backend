import { User } from '@prisma/client'
import bcrypt from 'bcryptjs'
import httpStatus from 'http-status'
import { Secret } from 'jsonwebtoken'
import ApiError from '../../../Errors/ApiError'
import config from '../../../config'
import { jwtHelpers } from '../../Helpers/jwtHelpers'
import { prisma } from '../../shared/prisma'
import { ILoginUserResponse } from './auth.interface'

const createUser = async (data: User): Promise<User | null> => {
  data.password = bcrypt.hashSync(data.password, 12)
  const result = await prisma.user.create({ data })
  return result
}

const loginUser = async (user: User): Promise<ILoginUserResponse> => {
  const result = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  })

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  const userExist = await bcrypt.compare(user.password, result.password)

  if (!userExist) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid credentials')
  }

  // create access token and refresh token
  const { id: userId, role } = result

  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  )

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.refresh_expires_in as string,
  )

  return { accessToken, refreshToken }
}

export const AuthService = { createUser, loginUser }
