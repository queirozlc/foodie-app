import { createContext } from 'react'
import { UpdateUserDto } from '../../models/UpdateUserDto'
import { User } from '../../models/User'
import UserService from '../../service/users/user.service'

type UserContextData = {
  update: (data: UpdateUserDto) => Promise<User>
}

export const UserContext = createContext<UserContextData>({} as UserContextData)

interface Props {
  children: React.ReactNode
}

export default function UserProvider({ children }: Props) {
  const userService = new UserService()

  async function update(data: UpdateUserDto): Promise<User> {
    const { data: userData } = await userService.updateUser(data)
    const { email, name, id, password, profileImage, roles } = userData
    return {
      email,
      name,
      id,
      password,
      profileImage,
      roles,
    }
  }

  return (
    <UserContext.Provider value={{ update }}>{children}</UserContext.Provider>
  )
}
