import { NextFunction, Request, RequestHandler, Response } from 'express'
import httpStatus from 'http-status'
import config from '../../../config'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IRefreshTokenResponse } from './auth.interface'
import { AuthService } from './auth.service'
import { User } from '../user/user.model'
import ApiError from '../../../errors/ApiError'

const LoginUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...loginData } = req.body
    const result = await AuthService.loginUser(loginData)

    const { refreshToken, ...others } = result

    // set refresh token into the cookie

    const cookieOption = {
      secure: config.env === 'production' ? true : false,
      httpOnly: true,
    }

    res.cookie('refreshToken', refreshToken, cookieOption)

    // delete refresh token
    if ('refreshToken' in result) {
      delete result.refreshToken
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User Login Successfully',
      data: others,
    })
  }
)

const refreshToken: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies
    const result = await AuthService.refreshToken(refreshToken)

    // set refresh token into the cookie

    const cookieOption = {
      secure: config.env === 'production' ? true : false,
      httpOnly: true,
    }

    res.cookie('refreshToken', refreshToken, cookieOption)

    sendResponse<IRefreshTokenResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User Login Successfully',
      data: result,
    })
  }
)

interface AuthenticatedRequest extends Request {
  user: any
}

const getUserProfile = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const email = req.user.email
    const user = await AuthService.getUserInfo(email)
    res.status(httpStatus.OK).json({
      success: true,
      message: 'User information retrieved successfully',
      data: user,
    })
  } catch (err: any) {
    next(new ApiError(httpStatus.NOT_FOUND, err.message))
  }
}

export const AuthController = {
  LoginUser,
  refreshToken,
  getUserProfile,
}
