import { NativeStackScreenProps } from '@react-navigation/native-stack'
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { AdminProfileStackParamList } from '../../../../../routes/admin/admin'
import ProfileUpdateForm from '../../components/ProfileUpdateForm'

type Props = NativeStackScreenProps<AdminProfileStackParamList, 'ProfileUpdate'>

export default function ProfileUpdateScreen({ route }: Props) {
  const { user } = route.params

  return (
    <View className="flex-1 bg-white">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="position" enabled={true}>
          <ProfileUpdateForm user={user} />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  )
}
