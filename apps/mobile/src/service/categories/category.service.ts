import { CreateCategory } from '../../models/CreateCategory'
import { ApiService } from '../api.service'

export class CategoryService extends ApiService {
  constructor() {
    super('categories')
  }

  async createCategory(data: CreateCategory) {
    return await this.post(data, '/')
  }
}
