import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type AdminHomeStackParamList = {
  Category: undefined
}

export type AdminOrderStackParamList = {
  Order: undefined
}

export type AdminProfileStackParamList = {
  Profile: undefined
  Settings: undefined
}

export type AdminTabParamList = {
  AdminHome: AdminHomeStackParamList
  AdminOrders: AdminOrderStackParamList
  AdminProfiles: AdminProfileStackParamList
}

export type AdminTabNavigation = BottomTabNavigationProp<AdminTabParamList>

export type AdminHomeStackNavigation =
  NativeStackNavigationProp<AdminHomeStackParamList>

export type AdminOrderStackNavigation =
  NativeStackNavigationProp<AdminOrderStackParamList>

export type AdminProfileStackNavigation =
  NativeStackNavigationProp<AdminProfileStackParamList>
