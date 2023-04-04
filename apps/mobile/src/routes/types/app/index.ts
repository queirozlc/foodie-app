import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Role } from '../../../models/Role'
import { AdminTabParamList } from '../../admin/admin'

export type AppStackParamList = {
  Home: undefined
  RoleProfileScreen: { roles: Role[] }
  AdminTab: AdminTabParamList
}

export type AppNavigation = NativeStackNavigationProp<AppStackParamList>
