import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import colors from 'tailwindcss/colors'
import { AdminHomeStackNavigation } from '../../../../routes/admin/admin'

export default function CreateCategory() {
  const navigation = useNavigation<AdminHomeStackNavigation>()

  return (
    <Feather
      name="plus"
      size={24}
      color={colors.gray[800]}
      style={{
        padding: 4,
        backgroundColor: colors.yellow[500],
        borderRadius: 20,
      }}
      onPress={() => navigation.navigate('CreateCategory')}
    />
  )
}
