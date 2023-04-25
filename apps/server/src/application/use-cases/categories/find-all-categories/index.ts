import { CategoryRepository } from 'src/application/repositories/category.repository';
import { CategoryMapper } from 'src/infra/database/prisma/mappers/category-mapper';
import { FindCategoryResponse } from './dtos/find-category-response';

export class FindAllCategoriesUseCase {
  constructor(private readonly categoriesRepository: CategoryRepository) {}

  async execute(): Promise<FindCategoryResponse[]> {
    const categories = await this.categoriesRepository.findAll();
    return categories.map((category) => CategoryMapper.toDto(category));
  }
}
