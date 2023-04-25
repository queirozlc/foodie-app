import * as yup from 'yup'

export function useYup() {
  const signUpSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Email invalid').required('Email is required'),
    password: yup.string().required('Password is required'),
    confirmPassword: yup
      .string()
      .required('You must confirm your password')
      .oneOf([yup.ref('password')], 'Confirm Password does not match'),
  })

  const signInSchema = yup.object().shape({
    email: yup.string().email('Email invalid').required('Email is required'),
    password: yup.string().required('Password is required'),
  })

  const updateUserSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Email invalid').required('Email is required'),
  })

  const createCategorySchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    description: yup.string().required('Description is required'),
    alias: yup.string().required('Alias is required'),
  })

  return {
    signUpSchema,
    signInSchema,
    updateUserSchema,
    createCategorySchema,
  }
}
