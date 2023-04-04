import { Feather } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import colors from 'tailwindcss/colors'
import CategoryScreen from '../../screens/Admin/Home'
import OrderScreen from '../../screens/Admin/Orders'
import ProfileScreen from '../../screens/Admin/Profile'
import AdminSettingsScreen from '../../screens/Admin/Profile/Settings'
import {
  AdminHomeStackParamList,
  AdminOrderStackParamList,
  AdminProfileStackParamList,
  AdminTabParamList,
} from './admin'

const Tab = createBottomTabNavigator<AdminTabParamList>()
const HomeStack = createNativeStackNavigator<AdminHomeStackParamList>()
const OrderStack = createNativeStackNavigator<AdminOrderStackParamList>()
const ProfileStack = createNativeStackNavigator<AdminProfileStackParamList>()

const AdminHomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Category" component={CategoryScreen} />
  </HomeStack.Navigator>
)

const AdminOrdersStackScreen = () => (
  <OrderStack.Navigator>
    <OrderStack.Screen name="Order" component={OrderScreen} />
  </OrderStack.Navigator>
)

const AdminProfilesStackScreen = () => (
  <ProfileStack.Navigator
    screenOptions={{
      animation: 'slide_from_right',
    }}
  >
    <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    <ProfileStack.Screen name="Settings" component={AdminSettingsScreen} />
  </ProfileStack.Navigator>
)

export default function AdminTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          paddingVertical: 10,
        },
      }}
    >
      <Tab.Screen
        name="AdminHome"
        component={AdminHomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarLabelStyle: {
            fontFamily: 'Poppins_600SemiBold',
            fontSize: 12,
          },
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={24} color={color} />
          ),
          tabBarActiveTintColor: colors.gray[800],
        }}
      />

      <Tab.Screen
        name="AdminOrders"
        component={AdminOrdersStackScreen}
        options={{
          tabBarLabel: 'Orders',
          tabBarLabelStyle: {
            fontFamily: 'Poppins_600SemiBold',
            fontSize: 12,
          },
          tabBarIcon: ({ color }) => (
            <Feather name="check" size={24} color={color} />
          ),
          tabBarActiveTintColor: colors.gray[800],
        }}
      />
      <Tab.Screen
        name="AdminProfiles"
        component={AdminProfilesStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarLabelStyle: {
            fontFamily: 'Poppins_600SemiBold',
            fontSize: 12,
          },
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
          tabBarActiveTintColor: colors.gray[800],
        }}
      />
    </Tab.Navigator>
  )
}
