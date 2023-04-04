import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Text, TouchableOpacity, View } from 'react-native'
import { ExceptionDetails } from '../../exceptions/Exception'
import { SignInRequest } from '../../models/SignInRequest'
import { AuthStackParamList } from '../../routes/types/auth'
import { useAuth } from '../../utils/hooks/useAuth'
import { useYup } from '../../utils/hooks/useYup'
import ControlInput from '../AuthInput/ControlInput'

export default function LoginForm() {
  const navigation = useNavigation<AuthStackParamList>()
  const { signIn } = useAuth()
  const [errorMessage, setErrorMessage] = useState<string>('')
  const { signInSchema } = useYup()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInRequest>({
    resolver: yupResolver(signInSchema),
  })

  async function handleSignIn(data: SignInRequest) {
    try {
      await signIn(data)
    } catch (error) {
      const { response } = error as AxiosError<ExceptionDetails>
      setErrorMessage(response?.data?.message as string)
    }
  }
  return (
    <View className="absolute space-y-5 h-[50%] bg-white w-full bottom-0 rounded-t-[40px] p-8">
      <View>
        <Text className="font-poppins-semi mb-2 text-soft-gray-500 text-2xl">
          Log In
        </Text>
      </View>

      <View className="space-y-10">
        <View>
          <ControlInput
            control={control}
            name="email"
            imgPath={require('../../../assets/email.png')}
            keyboardType="email-address"
            placeholder="Email"
            autoCapitalize="none"
            error={errors.email}
          />
        </View>
        <View>
          <ControlInput
            control={control}
            name="password"
            imgPath={require('../../../assets/password.png')}
            keyboardType="default"
            placeholder="Password"
            secureTextEntry={true}
            error={errors.password}
          />
        </View>
      </View>

      <View className="w-full justify-center pt-5">
        <TouchableOpacity
          className="w-full items-center rounded-lg h-12 bg-yellow-500 justify-center"
          onPress={handleSubmit(handleSignIn)}
        >
          <Text className="font-poppins-semi text-lg text-black">Log In</Text>
        </TouchableOpacity>
      </View>

      {errorMessage && (
        <Text className="font-poppins-medium text-center text-sm text-error-500">
          {errorMessage}
        </Text>
      )}

      <View className="flex-row justify-center items-center space-x-2">
        <Text className="font-poppins-medium text-md">
          Don't have an account?
        </Text>
        <Text
          className="font-poppins-semi text-md text-yellow-500 border-b-2 border-yellow-500"
          onPress={() => navigation.navigate('Register')}
        >
          Sign Up
        </Text>
      </View>
    </View>
  )
}
