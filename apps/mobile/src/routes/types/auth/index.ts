import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AppStackParamList } from '../app'

export type AuthPropsNavigation = {
  Login: undefined
  Register: undefined
  App: AppStackParamList
}

export type AuthStackParamList = NativeStackNavigationProp<AuthPropsNavigation>
