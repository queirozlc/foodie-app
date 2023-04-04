import { AxiosResponse } from 'axios'
import { CreateUserDto } from '../../models/CreateUserDto'
import { JwtResponse } from '../../models/JwtResponse'
import { SignInRequest } from '../../models/SignInRequest'
import { ApiService } from '../api.service'

export class AuthService extends ApiService {
  constructor() {
    super('/auth')
  }

  login(data: SignInRequest): Promise<AxiosResponse<JwtResponse>> {
    return this.post(data, '/login')
  }

  register(data: CreateUserDto): Promise<AxiosResponse<JwtResponse>> {
    return this.post(data, '/')
  }
}
