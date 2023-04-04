import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store'
import jwtDecode from 'jwt-decode'
import { createContext, useEffect, useState } from 'react'
import { CreateUserDto } from '../../models/CreateUserDto'
import { JwtPayload } from '../../models/JwtPayload'
import { SignInRequest } from '../../models/SignInRequest'
import { User } from '../../models/User'
import { UserToken } from '../../models/UserToken'
import { ApiService } from '../../service/api.service'
import { AuthService } from '../../service/auth/auth.service'

interface AuthContextData {
  user: User | null
  signIn: (data: SignInRequest) => Promise<UserToken>
  signUp: (data: CreateUserDto) => Promise<UserToken>
  signOut: () => Promise<void>
  isAuthenticated: boolean
  loading: boolean
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

interface AuthProviderProps {
  children: React.ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const authService = new AuthService()

  async function signIn({
    email,
    password,
  }: SignInRequest): Promise<UserToken> {
    const { data } = await authService.login({ email, password })
    const jwtResponse: JwtPayload = jwtDecode<JwtPayload>(data.accessToken)
    setUser({
      email: jwtResponse.email,
      name: jwtResponse.name,
      roles: jwtResponse?.roles,
      id: jwtResponse.sub,
      profileImage: jwtResponse?.profileImage,
    })

    ApiService.assignAccessToken(data.accessToken)
    await AsyncStorage.setItem(
      '@user',
      JSON.stringify({
        email: jwtResponse.email,
        name: jwtResponse.name,
        id: jwtResponse.sub,
        profileImage: jwtResponse?.profileImage,
      }),
    )
    await SecureStore.setItemAsync('session-id', data.accessToken)

    return {
      token: data.accessToken,
      user: user as User,
    }
  }

  async function signUp({
    email,
    name,
    password,
    profileImage,
  }: CreateUserDto): Promise<UserToken> {
    const { data } = await authService.register({
      email,
      name,
      password,
      profileImage,
    })

    const jwtResponse = jwtDecode<JwtPayload>(data.accessToken)

    setUser({
      email: jwtResponse.email,
      name: jwtResponse.name,
      roles: jwtResponse?.roles,
      profileImage: jwtResponse?.profileImage,
      id: jwtResponse.sub,
    })

    await AsyncStorage.setItem(
      '@user',
      JSON.stringify({
        email: jwtResponse.email,
        name: jwtResponse.name,
        profileImage: jwtResponse?.profileImage,
        id: jwtResponse.sub,
      }),
    )
    ApiService.assignAccessToken(data.accessToken)
    await SecureStore.setItemAsync('session-id', data.accessToken)
    return {
      token: data.accessToken,
      user: user as User,
    }
  }

  async function signOut(): Promise<void> {
    await AsyncStorage.removeItem('@user')
    await SecureStore.deleteItemAsync('session-id')
    setUser(null)
  }

  useEffect(() => {
    async function loadUserStorageData(): Promise<void> {
      const accessToken = await SecureStore.getItemAsync('session-id')

      if (accessToken) {
        const { email, name, sub, profileImage, roles } =
          jwtDecode<JwtPayload>(accessToken)
        setUser({
          email,
          name,
          roles,
          profileImage,
          id: sub,
        })
        setLoading(false)
      }

      setLoading(false)
    }
    loadUserStorageData()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        user,
        isAuthenticated: !!user,
        loading,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
