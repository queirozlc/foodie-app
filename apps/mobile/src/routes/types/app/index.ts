import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Role } from '../../../models/Role'
import { AdminTabParamList } from '../../admin/admin'

export type AppStackParamList = {
  RoleProfileScreen: { roles: Role[] }
  AdminTab: undefined | { screen: keyof AdminTabParamList }
}

export type AppNavigationProps = NativeStackNavigationProp<AppStackParamList>
