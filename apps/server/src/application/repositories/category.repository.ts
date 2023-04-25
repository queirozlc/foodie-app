export abstract class CategoryRepository {
  abstract create(category: any): Promise<any>;
  abstract update(category: any): Promise<any>;
  abstract delete(id: string): Promise<any>;
  abstract findById(id: string): Promise<any>;
  abstract findByName(name: string): Promise<any>;
  abstract findByAlias(alias: string): Promise<any>;
  abstract findAll(): Promise<any>;
}
