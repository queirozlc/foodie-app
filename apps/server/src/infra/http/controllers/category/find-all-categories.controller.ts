import { Controller, Get } from '@nestjs/common';
import { FindAllCategoriesUseCase } from 'src/application/use-cases/categories/find-all-categories';

@Controller('categories')
export class FindAllCategoriesController {
  constructor(
    private readonly findAllCategoriesUseCase: FindAllCategoriesUseCase,
  ) {}

  @Get()
  async handle() {
    return await this.findAllCategoriesUseCase.execute();
  }
}
