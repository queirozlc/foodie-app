import { Category } from 'src/application/domains/entities/category';
import { FileUploader } from 'src/application/ports/file-uploader';
import { CategoryRepository } from 'src/application/repositories/category.repository';
import { CreateCategoryDTO } from './dtos/create-category-request';
import { CreateCategoryResponse } from './dtos/create-category-response';

export class CreateCategoryUseCase {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly fileUploader: FileUploader,
  ) {}

  async execute({
    alias,
    description,
    name,
    thumbnail,
  }: CreateCategoryDTO): Promise<CreateCategoryResponse> {
    const category = Category.create({
      alias,
      description,
      name,
    });

    if (thumbnail) {
      const thumbnailUrl = await this.fileUploader.upload(thumbnail);
      category.updateThumbnail(thumbnailUrl);
    }

    await this.categoryRepository.create(category);

    return {
      id: category.id,
      alias: category.alias,
      description: category.description,
      name: category.name,
    };
  }
}
