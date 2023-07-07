import { User } from '../models/user.model'
import UserController from './user'

export const userController = new UserController(User)
