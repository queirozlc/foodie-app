import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types'
import { User } from '../../models/User'

export type AdminHomeStackParamList = {
  Category: undefined
}

export type AdminOrderStackParamList = {
  Order: undefined
}

export type AdminProfileStackParamList = {
  Profile: undefined
  Settings: undefined
  ProfileUpdate: { user: User }
}

export type AdminTabParamList = {
  AdminHome: undefined
  AdminOrders: undefined
  AdminProfiles: undefined
}

export type AdminTabNavigation = BottomTabNavigationProp<AdminTabParamList>

export type AdminHomeStackNavigation =
  NativeStackNavigationProp<AdminHomeStackParamList>

export type AdminOrderStackNavigation =
  NativeStackNavigationProp<AdminOrderStackParamList>

export type AdminProfileStackNavigation =
  NativeStackNavigationProp<AdminProfileStackParamList>
