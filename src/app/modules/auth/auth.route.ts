import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AuthController } from './auth.controller'
import { LoginValidation } from './auth.validation'
import authenticateToken from '../../middlewares/auth1'
const router = express.Router()

router.post(
  '/login',
  validateRequest(LoginValidation.loginZodSchema),
  AuthController.LoginUser
)
router.post(
  '/refresh-token',
  validateRequest(LoginValidation.refreshTokenZodSchema),
  AuthController.refreshToken
)
router.get('/userinfo', authenticateToken, AuthController.getUserProfile)

export default router
