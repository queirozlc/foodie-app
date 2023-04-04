import { Image, View } from 'react-native'

export default function AuthBanner() {
  return (
    <View>
      <View className="bg-black">
        <Image
          source={require('../../../assets/chef.jpg')}
          className="opacity-70 w-full h-full bottom-[30%]"
        />
      </View>
    </View>
  )
}
