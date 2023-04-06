import { Image, View } from 'react-native'

export default function ProfileBanner() {
  return (
    <View className="bg-black">
      <Image
        source={require('../../../../../../assets/city.jpg')}
        className="w-full h-full opacity-50 bottom-[20%]"
      />
    </View>
  )
}
