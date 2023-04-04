import { ActivityIndicator, View } from 'react-native'
import { useAuth } from '../utils/hooks/useAuth'
import AppStackNavigation from './app.route'
import AuthStackNavigation from './auth.route'

export default function Router() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  return isAuthenticated ? <AppStackNavigation /> : <AuthStackNavigation />
}
