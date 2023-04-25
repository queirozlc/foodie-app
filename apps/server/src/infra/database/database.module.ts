import { Module } from '@nestjs/common';
import { CategoryRepository } from 'src/application/repositories/category.repository';
import { UserRepository } from 'src/application/repositories/user.repository';
import { CategoryMapper } from './prisma/mappers/category-mapper';
import { PrismaService } from './prisma/prisma.service';
import { PrismaCategoryRepository } from './prisma/repositories/prisma-category.repository';
import { PrismaUserRepository } from './prisma/repositories/prisma-user.repository';

@Module({
  providers: [
    PrismaService,
    CategoryMapper,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: CategoryRepository,
      useClass: PrismaCategoryRepository,
    },
  ],
  exports: [UserRepository, CategoryRepository, CategoryMapper],
})
export class DatabaseModule {}
