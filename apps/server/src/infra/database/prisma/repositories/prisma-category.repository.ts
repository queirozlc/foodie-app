import { Injectable } from '@nestjs/common';
import { Category } from 'src/application/domains/entities/category';
import { CategoryRepository } from 'src/application/repositories/category.repository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaCategoryRepository implements CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(category: Category): Promise<Category> {
    const categorySaved = await this.prisma.categories.create({
      data: {
        name: category.name,
        description: category.description,
        alias: category.alias,
        thumbnail: category.thumbnail,
        id: category.id,
        created_at: category.createdAt,
      },
    });

    return Category.create(categorySaved);
  }
  async update(category: Category): Promise<Category> {
    throw new Error('Method not implemented.');
  }

  async delete(id: string): Promise<void> {
    await this.prisma.categories.delete({
      where: {
        id,
      },
    });
  }

  async findById(id: string): Promise<Category> {
    const categoryFound = await this.prisma.categories.findUnique({
      where: {
        id,
      },
    });

    return Category.create(categoryFound);
  }
  async findByName(name: string): Promise<Category> {
    const categoryFound = await this.prisma.categories.findUnique({
      where: {
        name,
      },
    });

    return Category.create(categoryFound);
  }
  async findByAlias(alias: string): Promise<Category> {
    const categoryFound = await this.prisma.categories.findUnique({
      where: {
        alias,
      },
    });

    return Category.create(categoryFound);
  }
  async findAll(): Promise<Category[]> {
    const categories = await this.prisma.categories.findMany();

    return categories.map((category) => Category.create(category));
  }
}
