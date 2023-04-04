import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import AuthBanner from '../../components/AuthBanner'
import LoginForm from '../../components/LoginForm'

export default function LoginScreen() {
  return (
    <View className="flex-1 h-full bg-white">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="position" enabled={true}>
          <AuthBanner />
          <LoginForm />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  )
}
