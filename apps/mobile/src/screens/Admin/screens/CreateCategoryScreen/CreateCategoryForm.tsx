import { yupResolver } from '@hookform/resolvers/yup'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Text, TouchableOpacity, View } from 'react-native'
import ControlInput from '../../../../components/AuthInput/ControlInput'
import { ExceptionDetails } from '../../../../exceptions/Exception'
import { CreateCategory } from '../../../../models/CreateCategory'
import useCreateCategory from '../../../../utils/hooks/useCreateCategory'
import { useYup } from '../../../../utils/hooks/useYup'

interface CreateCategoryFormProps {
  name: string
  description: string
  alias: string
}

export default function CreateCategoryForm() {
  const { createCategorySchema } = useYup()
  const { createCategory } = useCreateCategory()
  const [error, setError] = useState<string | string[]>('')
  const [successMessage, setSuccessMessage] = useState('')

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateCategoryFormProps>({
    resolver: yupResolver(createCategorySchema),
  })

  async function handleCreate(data: CreateCategory) {
    try {
      const response = await createCategory(data)
      setSuccessMessage('Category created successfully')
      cleanFields()
    } catch (error) {
      const { response } = error as AxiosError<ExceptionDetails>
      if (response) {
        setError(response.data.message)
      }
    }
  }

  function cleanFields() {
    setTimeout(() => {
      setValue('name', '')
      setValue('description', '')
      setValue('alias', '')
      setSuccessMessage('')
      setError('')
    }, 3000)
  }

  return (
    <View className="space-y-12 flex-1">
      <View>
        <ControlInput
          imgPath={require('../../../../../assets/categories.png')}
          placeholder="Category Name"
          control={control}
          name="name"
          autoCapitalize="words"
          error={errors.name}
        />
      </View>

      <View>
        <ControlInput
          imgPath={require('../../../../../assets/description.png')}
          placeholder="Description"
          keyboardType="default"
          control={control}
          name="description"
          error={errors.description}
        />
      </View>

      <View>
        <ControlInput
          imgPath={require('../../../../../assets/document.png')}
          placeholder="Alias"
          autoCapitalize="none"
          keyboardType="default"
          control={control}
          name="alias"
          error={errors.alias}
        />
      </View>

      {error && (
        <View>
          <Text className="text-error-500 text-md font-poppins-medium">
            {error}
          </Text>
        </View>
      )}

      {successMessage && (
        <View>
          <Text className="text-dark-gray-600 text-md font-poppins-medium">
            {successMessage}
          </Text>
        </View>
      )}

      <View>
        <TouchableOpacity
          className="w-full items-center bg-brand-yellow-500 h-12 justify-center rounded-lg"
          activeOpacity={0.75}
          onPress={() => handleSubmit(handleCreate)()}
        >
          <Text className="text-lg font-poppins-semi">Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
