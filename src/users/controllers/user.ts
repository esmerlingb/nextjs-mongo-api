import abind from 'abind'
import { connectDB } from '@/service_providers/mongodb/connect_db'
import { User } from '../models/user.model'
import yup from '@/service_providers/validators/yup'

interface UserDTO {
  id: string
  email: string
  firstName: string
  lastName: string
}

interface UpsertUserDTO {
  input: {
    id?: string
    email?: string
    firstName?: string
    lastName?: string
  }
}

type CreateUserDTO = Omit<UserDTO, 'id'>
type UpdateUserDTO = Partial<CreateUserDTO>

/**
 * A better approach would be to move some of this logic to a services folder
 * and the responsibility of the controller would be to validate the data
 * we did it this way for simplicity of the demo
 */

export default class UserController {
  constructor (private readonly userModel: typeof User) {
    abind(this)
  }

  async getUsers (): Promise<UserDTO[]> {
    await connectDB()
    return this.userModel.find()
  }

  private async createUser (input: CreateUserDTO): Promise<UserDTO> {
    const user = new this.userModel(input)
    await user.save()
    return user as UserDTO
  }

  private async updateUser (id: string, input: UpdateUserDTO): Promise<UserDTO | null> {
    const user = await this.userModel.findById(id)
    if (!user) return null
    
    user.set(input)
    await user.save()
    return user as UserDTO
  }

  async upsertUser ({ input }: UpsertUserDTO): Promise<UserDTO | null> {
    await connectDB()

    if (input.id) {
      const schema = yup.object({
        email: yup.string().email().optional(),
        firstName: yup.string().optional(),
        lastName: yup.string().optional()
      })

      const userInput = await schema.validate(input)
      return this.updateUser(input.id, userInput)
    }

    const schema = yup.object({
      email: yup.string().email().required(),
      firstName: yup.string().required(),
      lastName: yup.string().required()
    })
    
    const userInput = await schema.validate(input)
    return await this.createUser(userInput)
  }
}
