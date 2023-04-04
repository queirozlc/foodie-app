import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

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
  AdminHome: undefined
  AdminOrders: undefined
  AdminProfiles: undefined
}

export type AdminTabNavigation = BottomTabNavigationProp<AdminTabParamList>

export type AdminHomeStackNavigation =
  NativeStackScreenProps<AdminHomeStackParamList>

export type AdminOrderStackNavigation =
  NativeStackScreenProps<AdminOrderStackParamList>

export type AdminProfileStackNavigation =
  NativeStackScreenProps<AdminProfileStackParamList>
