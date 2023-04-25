import { CreateCategory } from '../../models/CreateCategory'
import { CategoryService } from '../../service/categories/category.service'

export default function useCreateCategory() {
  const service = new CategoryService()

  const createCategory = async (data: CreateCategory) => {
    const response = await service.createCategory(data)
    return response
  }

  return {
    createCategory,
  }
}
