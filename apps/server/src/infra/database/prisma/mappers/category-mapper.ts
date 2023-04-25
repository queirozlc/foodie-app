import { Category } from 'src/application/domains/entities/category';

interface CategoryResponse {
  id: string;
  name: string;
  description: string;
  alias: string;
  thumbnail?: string;
}

export class CategoryMapper {
  static toDto(category: Category): CategoryResponse {
    const { id, name, description, alias, thumbnail } = category;
    return {
      id,
      name,
      description,
      alias,
      thumbnail,
    };
  }
}
