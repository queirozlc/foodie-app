import { Text, TouchableOpacity, View } from 'react-native'
import { useAuth } from '../../utils/hooks/useAuth'

export default function HomeScreen() {
  const { signOut } = useAuth()

  async function handleLogout() {
    await signOut()
  }

  return (
    <View className="flex-1 bg-red-500 h-full items-center justify-center space-y-10">
      <Text className="font-poppins-semi text-2xl ">Home Page</Text>

      <View className="px-10 w-full">
        <TouchableOpacity
          className="w-full bg-white items-center justify-center h-16 rounded-full"
          activeOpacity={0.8}
          onPress={handleLogout}
        >
          <Text className="font-poppins-semi text-xl">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
