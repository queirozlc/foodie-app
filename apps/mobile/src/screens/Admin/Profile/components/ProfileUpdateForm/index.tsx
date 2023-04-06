import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Image, Pressable, Text, View } from 'react-native'
import ControlInput from '../../../../../components/AuthInput/ControlInput'
import { User } from '../../../../../models/User'
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

  function handleUpdateUser(data: UpdateUserFormProps) {
    console.log(data)
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
