import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDTO {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;
  @IsNotEmpty({ message: 'Description is required' })
  description: string;
  @IsNotEmpty({ message: 'Category alias is required' })
  alias: string;
  thumbnail?: string;
}
