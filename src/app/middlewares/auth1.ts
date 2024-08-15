import config from '../../config'
import jwt from 'jsonwebtoken'
import { User } from '../modules/user/user.model'
import { NextFunction, Request, Response } from 'express'


interface DecodedToken {
  email: string;
}
const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Access token is required' })
  }

  try {
    const decoded = jwt.verify(token, "secret") as DecodedToken;
    const user = await User.findOne({ email: decoded.email })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    req.user = user
    next()
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' })
  }
}

export default authenticateToken
