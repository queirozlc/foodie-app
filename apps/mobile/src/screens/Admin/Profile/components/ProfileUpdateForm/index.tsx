import { yupResolver } from '@hookform/resolvers/yup'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Image, Pressable, Text, View } from 'react-native'
import ControlInput from '../../../../../components/AuthInput/ControlInput'
import { ExceptionDetails } from '../../../../../exceptions/Exception'
import { User } from '../../../../../models/User'
import { useAuth } from '../../../../../utils/hooks/useAuth'
import { useUser } from '../../../../../utils/hooks/useUser'
import { useYup } from '../../../../../utils/hooks/useYup'
import ProfileBanner from '../ProfileBanner'

const defaultUserImage = require('../../../../../../assets/user_image.png')

interface ProfileUpdateFormProps {
  user: User | null
}

interface UpdateUserFormProps {
  name: string
  email: string
}

export default function ProfileUpdateForm({ user }: ProfileUpdateFormProps) {
  const { updateUserSchema } = useYup()
  const { update } = useUser()
  const [successMessage, setSuccessMessage] = useState<string>('')
  const { setUser } = useAuth()

  const {
    control,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<UpdateUserFormProps>({
    resolver: yupResolver(updateUserSchema),
  })

  useEffect(() => {
    if (user) {
      setValue('name', user.name)
      setValue('email', user.email)
    }
  }, [])

  async function handleUpdateUser(data: UpdateUserFormProps) {
    try {
      await update({
        ...data,
        id: user?.id,
      })
      setUser({
        ...user,
        ...data,
      })
      setSuccessMessage('User updated successfully')
    } catch (error) {
      const { response } = error as AxiosError<ExceptionDetails>
      console.log(response?.data)
    }
  }

  return (
    <View>
      <ProfileBanner />

      <View className="absolute self-center justify-self-center top-[16%] border-soft-gray-500 border-2 rounded-full">
        <Image
          source={defaultUserImage}
          style={{
            resizeMode: 'contain',
          }}
          className="w-24 h-24 rounded-full"
        />
      </View>
      <View className="pt-2 self-center absolute justify-self-center top-[30%] ">
        <Text className="font-poppins-semi text-lg text-light-gray-200">
          Update Profile Image
        </Text>
      </View>

      <View className="absolute w-full bg-white bottom-0 h-[50%] p-10 rounded-t-[40px] space-y-10">
        <View>
          <Text className="font-poppins-semi text-2xl">Edit Profile</Text>
        </View>

        <View>
          <ControlInput
            control={control}
            name="name"
            imgPath={require('../../../../../../assets/user.png')}
            keyboardType="default"
            placeholder="Full Name"
            error={errors.name}
          />
        </View>
        <View>
          <ControlInput
            control={control}
            name="email"
            imgPath={require('../../../../../../assets/email.png')}
            keyboardType="email-address"
            placeholder="Email"
            error={errors.email}
          />
        </View>

        {successMessage && (
          <Text className="font-poppins-semi text-sm pl-8 text-soft-gray-500">
            {successMessage}
          </Text>
        )}

        <View>
          <Pressable
            className="h-12 w-full items-center justify-center bg-yellow-500 rounded-lg active:bg-yellow-500/75"
            onPress={handleSubmit(handleUpdateUser)}
          >
            <Text className="font-poppins-semi text-lg">Update</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}
