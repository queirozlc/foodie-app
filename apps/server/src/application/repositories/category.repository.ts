import { Category } from '../domains/entities/category';

export abstract class CategoryRepository {
  abstract create(category: Category): Promise<Category>;
  abstract update(category: Category): Promise<Category>;
  abstract delete(id: string): Promise<void>;
  abstract findById(id: string): Promise<Category>;
  abstract findByName(name: string): Promise<Category>;
  abstract findByAlias(alias: string): Promise<Category>;
  abstract findAll(): Promise<Category[]>;
}
