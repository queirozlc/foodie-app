import { AxiosResponse } from 'axios'
import { UpdateUserDto } from '../../models/UpdateUserDto'
import { User } from '../../models/User'
import { ApiService } from '../api.service'

type UpdateInput = {
  id: string
  name: string
  email: string
}

export default class UserService extends ApiService {
  constructor() {
    super('users')
  }

  async updateUser(input: UpdateUserDto): Promise<AxiosResponse<User>> {
    return await this.put(`/${input.id}`, input)
  }
}
