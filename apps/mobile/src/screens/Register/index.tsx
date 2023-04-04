import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import AuthBanner from '../../components/AuthBanner'
import RegisterForm from '../../components/RegisterForm'

export default function RegisterScreen() {
  return (
    <View className="flex-1 h-full bg-white">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="position" enabled={true}>
          <>
            <AuthBanner />
            <RegisterForm />
          </>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  )
}
