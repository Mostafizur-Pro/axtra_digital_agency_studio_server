import { Model } from 'mongoose'

export type IUser = {
  email: string
  password: string
  role: 'admin' | 'user' | 'guest'
  profile: {
    firstName: string
    lastName: string
    phoneNumber: string
    address: string
  }
  status: 'active' | 'inactive' | 'banned'
  createdAt: Date
  updatedAt: Date
  lastLogin?: Date
  loginAttempts: number
  accountLocked: boolean
}
export type IUserMethods = {
  isUserExist(email: string): Promise<Partial<IUser> | null>

  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>
}

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>
