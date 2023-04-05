import { Feather } from '@expo/vector-icons'
import { Text, View } from 'react-native'
import colors from 'tailwindcss/colors'
import { User } from '../../../../../models/User'

interface UserProfileDataProps {
  user: User | null
  label: string
  icon: keyof typeof Feather.glyphMap
  field: string
}

export default function UserProfileData({
  label,
  icon,
  field,
}: UserProfileDataProps) {
  return (
    <View className="flex-row items-center space-x-4">
      <Feather name={icon} size={32} color={colors.yellow[500]} />
      <View>
        <Text className="text-xs uppercase text-light-gray-500 font-poppins-semi">
          {field}
        </Text>
        <Text className="text-lg font-poppins-semi">{label}</Text>
      </View>
    </View>
  )
}
