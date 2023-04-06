import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Image, Pressable, Text, View } from 'react-native'
import { User } from '../../../models/User'
import { AdminProfileStackNavigation } from '../../../routes/admin/admin'
import { useAuth } from '../../../utils/hooks/useAuth'
import ProfileBanner from './components/ProfileBanner'
import UserProfileData from './components/UserProfileData'
const defaultProfileImage = require('../../../../assets/user_image.png')
export default function ProfileScreen() {
  const { user, signOut } = useAuth()
  const navigation = useNavigation<AdminProfileStackNavigation>()

  async function handleLogout() {
    await signOut()
  }

  return (
    <View className="flex-1">
      <ProfileBanner />

      <View className="absolute self-center justify-self-center top-[16%] border-soft-gray-500 border-2 rounded-full">
        <Image
          source={defaultProfileImage}
          style={{
            resizeMode: 'contain',
          }}
          className="w-24 h-24 rounded-full"
        />
      </View>
      <View className="absolute w-full bg-white bottom-0 h-[50%] p-10 rounded-t-[40px] space-y-5">
        <View>
          <UserProfileData
            user={user}
            label={user?.name!}
            icon="user"
            field="Name"
          />
        </View>
        <View>
          <UserProfileData
            user={user}
            label={user?.email!}
            icon="mail"
            field="email"
          />
        </View>

        <View className="flex-1 space-y-4 pt-2">
          <Pressable
            className="group w-full border border-yellow-500 bg-transparent h-14 items-center justify-center rounded-lg active:bg-yellow-500/50"
            onPress={() =>
              navigation.navigate('ProfileUpdate', { user: user as User })
            }
          >
            <Text className="text-yellow-500 active:text-black text-lg font-poppins-semi">
              Update Profile
            </Text>
          </Pressable>

          <View>
            <Pressable
              className="group w-full bg-yellow-500 h-14 items-center justify-center rounded-lg active:bg-yellow-500/50 relative"
              onPress={handleLogout}
            >
              <View className="flex-row w-full flex-1 items-center justify-center">
                <Feather
                  name="log-out"
                  size={24}
                  color="black"
                  style={{
                    position: 'absolute',
                    left: 20,
                  }}
                />
                <Text className="text-light-gray-800 text-lg font-poppins-semi">
                  Logout
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  )
}
