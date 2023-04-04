import { Control, Controller } from 'react-hook-form'
import AuthInput, { AuthInputProps } from '.'

type Props = AuthInputProps & {
  control: Control<any>
  name: string
}

export default function ControlInput({ control, name, ...rest }: Props) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <AuthInput value={value} onChange={onChange} {...rest} />
      )}
    />
  )
}
