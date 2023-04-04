import { Role } from './role'

export type User = {
  id?: string
  email: string
  password?: string
  name: string
  profileImage?: string
  roles?: Role[]
}
