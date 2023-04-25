import { Image, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import useImagePicker from '../../../../utils/hooks/useImagePicker'
import CreateCategoryForm from './CreateCategoryForm'

export default function CreateCategoryScreen() {
  const { pickImage, image } = useImagePicker()

  async function handlePickImage() {
    await pickImage()
  }

  return (
    <SafeAreaView className="flex-1 space-y-24 bg-zinc-100">
      <TouchableOpacity
        className="items-center w-full pt-28"
        activeOpacity={0.8}
        onPress={() => handlePickImage()}
      >
        <Image
          source={require('../../../../../assets/image_new.png')}
          style={{
            resizeMode: 'contain',
          }}
          className="w-40 h-40"
        />
      </TouchableOpacity>
      <View className="bg-white flex-1 rounded-t-[40px] p-12">
        <CreateCategoryForm />
      </View>
    </SafeAreaView>
  )
}
