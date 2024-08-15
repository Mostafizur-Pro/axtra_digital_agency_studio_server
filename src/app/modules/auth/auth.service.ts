import httpStatus from 'http-status'
import { Secret } from 'jsonwebtoken'
import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { jwtHelpers } from '../../../helper/jwtHelper'
import { User } from '../user/user.model'
import {
  ILogin,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface'

const loginUser = async (payload: ILogin): Promise<ILoginUserResponse> => {
  const { email, password } = payload
  const user = new User()
  const isUserExist = await User.findOne({ email })
  console.log('em', isUserExist)
  // check user exist in the database s
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Does Not exist')
  }

  // check password
  if (
    isUserExist.password &&
    !user.isPasswordMatched(password, isUserExist.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect')
  }

  // create a access and refresh token
  const accessToken = jwtHelpers.createToken(
    { email: isUserExist.email },
    config.jwt_secret as Secret,
    config.jwt_expires_in as string
  )
  const { needsPasswordChange }: any = isUserExist

  const refreshToken = jwtHelpers.createToken(
    { email: isUserExist.email },
    config.jwt_refresh_secret as Secret,
    config.jwt_refresh_expires_in as string
  )

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: needsPasswordChange,
  }
}

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  const user = new User()
  let verifiedToken = null
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt_refresh_secret as Secret
    )
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'invalid refresh token')
  }

  // checking deleted users refresh token
  const { email } = verifiedToken
  const isUserExist = await user.isUserExist(email)
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }
  // generate new token
  const newAccessToken = jwtHelpers.createToken(
    { email: isUserExist.email },
    config.jwt_secret as Secret,
    config.jwt_expires_in as string
  )

  return {
    accessToken: newAccessToken,
  }
}

const getUserInfo = async (email: any) => {
  const user = await User.findOne({ email }).select('-password'); // Exclude password from the result
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

export const AuthService = {
  loginUser,
  refreshToken,
  getUserInfo
}
