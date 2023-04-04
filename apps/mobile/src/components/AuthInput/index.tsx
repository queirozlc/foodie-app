import { FieldError } from 'react-hook-form'
import { Image, Text, TextInput, View } from 'react-native'

export interface AuthInputProps {
  placeholder?: string
  imgPath: any
  value?: string
  onChange?: (text: string) => void
  secureTextEntry?: boolean
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad'
  error?: FieldError
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
}

export default function AuthInput({
  placeholder,
  imgPath,
  value,
  onChange,
  secureTextEntry,
  keyboardType,
  error,
  autoCapitalize,
}: AuthInputProps) {
  return (
    <View className="space-y-3">
      <View className="flex-row space-x-3 items-center">
        <Image source={imgPath} className="h-5 w-5" />
        <TextInput
          placeholder={placeholder}
          className={`border-b-2 flex-1 font-poppins-medium text-lg
          border-dark-gray-300 focus:border-yellow-500 pr-8
            ${error && 'border-error-500 focus:border-yellow-500'}
          `}
          value={value}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          onChangeText={onChange}
          autoCapitalize={autoCapitalize}
        />
      </View>

      {error && (
        <Text
          className={`font-poppins-semi text-xs text-left pl-8 text-dark-gray-500 ${
            error && 'text-error-500'
          }`}
        >
          {error.message}
        </Text>
      )}
    </View>
  )
}
