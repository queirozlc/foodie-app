import { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import AuthInput from '../../../../components/AuthInput'

export default function CreateCategoryForm() {
  const [categoryName, setCategoryName] = useState('')
  const [description, setDescription] = useState('')
  const [alias, setAlias] = useState('')

  function handleSubmit() {
    console.log({ categoryName, description, alias })
  }

  return (
    <View className="space-y-12 flex-1">
      <View>
        <AuthInput
          imgPath={require('../../../../../assets/categories.png')}
          placeholder="Category Name"
          value={categoryName}
          onChange={setCategoryName}
        />
      </View>

      <View>
        <AuthInput
          imgPath={require('../../../../../assets/description.png')}
          placeholder="Description"
          value={description}
          onChange={setDescription}
        />
      </View>

      <View>
        <AuthInput
          imgPath={require('../../../../../assets/document.png')}
          placeholder="Alias"
          value={alias}
          onChange={setAlias}
        />
      </View>

      <View>
        <TouchableOpacity
          className="w-full items-center bg-brand-yellow-500 h-12 justify-center rounded-lg"
          activeOpacity={0.75}
          onPress={handleSubmit}
        >
          <Text className="text-lg font-poppins-semi">Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
