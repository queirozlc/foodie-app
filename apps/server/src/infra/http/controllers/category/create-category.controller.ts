import { Body, Controller, Post } from '@nestjs/common';
import { CreateCategoryUseCase } from 'src/application/use-cases/categories/create-category/create-category';
import { CreateCategoryDTO } from 'src/application/use-cases/categories/create-category/dtos/create-category-request';
import { CreateCategoryResponse } from 'src/application/use-cases/categories/create-category/dtos/create-category-response';

@Controller('categories')
export class CreateCategoryController {
  constructor(private readonly createCategory: CreateCategoryUseCase) {}

  @Post()
  async handle(
    @Body() input: CreateCategoryDTO,
  ): Promise<CreateCategoryResponse> {
    return await this.createCategory.execute(input);
  }
}
