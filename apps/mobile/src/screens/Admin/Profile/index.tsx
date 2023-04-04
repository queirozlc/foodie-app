import { useNavigation } from '@react-navigation/native'
import { Text, View } from 'react-native'
import { AdminProfileStackNavigation } from '../../../routes/admin/admin'

export default function ProfileScreen() {
  const navigation = useNavigation<AdminProfileStackNavigation>()

  return (
    <View className="flex-1 bg-yellow-500 justify-center items-center">
      <Text
        className="font-poppins-bold text-2xl text-dark-gray-500"
        onPress={() => navigation.navigate('Settings')}
      >
        Go to Settings
      </Text>
    </View>
  )
}
