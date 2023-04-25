import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'

export default function useImagePicker() {
  const [file, setFile] = useState<ImagePicker.ImagePickerAsset>()
  const [image, setImage] = useState<string>()

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
      setFile(result.assets[0])
    }
  }

  return { file, pickImage, image }
}
