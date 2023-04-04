import { Role } from './Role'

export type JwtPayload = {
  sub: string
  email: string
  name: string
  iat?: number
  exp?: number
  profileImage?: string
  roles?: Role[]
}
