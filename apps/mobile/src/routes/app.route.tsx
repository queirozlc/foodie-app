import { createNativeStackNavigator } from '@react-navigation/native-stack'
import colors from 'tailwindcss/colors'
import RoleProfileScreen from '../screens/RoleProfileScreen'
import UserProvider from '../utils/context/UserContext'
import { useAuth } from '../utils/hooks/useAuth'
import AdminTabs from './admin/admin.route'
import { AppStackParamList } from './types/app'

const Stack = createNativeStackNavigator<AppStackParamList>()

export default function AppStackNavigation() {
  const { user } = useAuth()
  const hasMoreThanOneRole = user?.roles?.length! > 1
  // const hasMoreThanOneRole = false

  return (
    <UserProvider>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={hasMoreThanOneRole ? 'RoleProfileScreen' : 'AdminTab'}
      >
        <Stack.Screen name="AdminTab" component={AdminTabs} />
        <Stack.Screen
          name="RoleProfileScreen"
          component={RoleProfileScreen}
          options={{
            headerShown: true,
            title: 'Choose a Role',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Poppins_600SemiBold',
              fontSize: 20,
            },
            headerTintColor: colors.gray[900],
            headerStyle: {
              backgroundColor: colors.yellow[500],
            },
            headerShadowVisible: true,
          }}
          initialParams={{
            roles: user?.roles,
          }}
        />
      </Stack.Navigator>
    </UserProvider>
  )
}
