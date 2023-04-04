import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { Text, TouchableOpacity, View } from 'react-native'
import { ExceptionDetails } from '../../exceptions/Exception'
import { CreateUserDto } from '../../models/CreateUserDto'
import { AuthStackParamList } from '../../routes/types/auth'
import { useAuth } from '../../utils/hooks/useAuth'
import { useYup } from '../../utils/hooks/useYup'
import ControlInput from '../AuthInput/ControlInput'

interface RegisterFormProps {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export default function RegisterForm() {
  const navigation = useNavigation<AuthStackParamList>()
  const { signUp } = useAuth()
  const { signUpSchema } = useYup()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormProps>({
    resolver: yupResolver(signUpSchema),
  })

  async function handleSignUp(data: CreateUserDto) {
    try {
      const response = await signUp(data)
      console.log(response)
    } catch (error) {
      const { response } = error as AxiosError<ExceptionDetails>
      console.log(response?.data?.message as string)
    }
  }

  return (
    <View className="absolute space-y-6 h-[65%] bg-white w-full bottom-0 rounded-t-[40px] p-8">
      <View>
        <Text className="font-poppins-semi text-2xl">Sign Up</Text>
      </View>

      <View className="space-y-7">
        <View>
          <ControlInput
            control={control}
            name="name"
            imgPath={require('../../../assets/user.png')}
            keyboardType="default"
            placeholder="Full Name"
            error={errors.name}
          />
        </View>

        <View>
          <ControlInput
            control={control}
            name="email"
            imgPath={require('../../../assets/email.png')}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />
        </View>

        <View>
          <ControlInput
            control={control}
            name="password"
            imgPath={require('../../../assets/password.png')}
            placeholder="Password"
            keyboardType="default"
            secureTextEntry={true}
            error={errors.password}
          />
        </View>
        <View>
          <ControlInput
            name="confirmPassword"
            control={control}
            imgPath={require('../../../assets/password.png')}
            placeholder="Confirm Password"
            keyboardType="default"
            secureTextEntry={true}
            error={errors.confirmPassword}
          />
        </View>

        <View>
          <TouchableOpacity
            className="w-full items-center rounded-lg h-12 bg-yellow-500 justify-center"
            onPress={handleSubmit(handleSignUp)}
          >
            <Text className="font-poppins-semi text-lg text-black">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center items-center space-x-2">
          <Text className="font-poppins-medium text-md">
            Already have an account?
          </Text>
          <Text
            className="font-poppins-semi text-md text-yellow-500 border-b-2 border-yellow-500"
            onPress={() => navigation.navigate('Login')}
          >
            Log In
          </Text>
        </View>
      </View>
    </View>
  )
}
