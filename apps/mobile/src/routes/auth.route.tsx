import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/Login'
import RegisterScreen from '../screens/Register'
import { AuthPropsNavigation } from './types/auth'

const Stack = createNativeStackNavigator<AuthPropsNavigation>()

export default function AuthStackNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  )
}
