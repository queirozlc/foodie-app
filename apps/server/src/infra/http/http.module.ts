import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MulterModule } from '@nestjs/platform-express';
import { LocalFileUploader } from 'src/application/adapters/local-file-uploader';
import { FileUploader } from 'src/application/ports/file-uploader';
import { CategoryRepository } from 'src/application/repositories/category.repository';
import { UserRepository } from 'src/application/repositories/user.repository';
import { JwtStrategy } from 'src/application/strategies/jwt.strategy';
import { LocalStrategy } from 'src/application/strategies/local.strategy';
import { AuthenticateUserUseCase } from 'src/application/use-cases/auth/authenticate-user.usecase';
import { CreateUserUseCase } from 'src/application/use-cases/auth/create-user.usecase';
import { ValidateUserUseCase } from 'src/application/use-cases/auth/validate-user.usecase';
import { CreateCategoryUseCase } from 'src/application/use-cases/categories/create-category/create-category';
import { FindAllCategoriesUseCase } from 'src/application/use-cases/categories/find-all-categories';
import { DeleteProfileImageUseCase } from 'src/application/use-cases/user/delete-proilfe-image.usecase';
import { DeleteUserUseCase } from 'src/application/use-cases/user/delete-user.usecase';
import { UpdateUserUseCase } from 'src/application/use-cases/user/update-user.usecase';
import { UploadProfileImageUseCase } from 'src/application/use-cases/user/upload-profile-image.usecase';
import { DatabaseModule } from '../database/database.module';
import { S3Module } from '../s3/s3.module';
import { AuthController } from './controllers/auth/auth.controller';
import { CreateCategoryController } from './controllers/category/create-category.controller';
import { FindAllCategoriesController } from './controllers/category/find-all-categories.controller';
import { UserController } from './controllers/user/user.controller';
import { RoleGuard } from './guards/role.guard';
import { LoginValidationMiddleware } from './middleware/login.middleware';
import { multerConfig } from './middleware/multer.middleware';
import { PassportJwtStrategy } from './strategies/passport-jwt.strategy';
import { PassportLocalStrategy } from './strategies/passport-local.strategy';

@Module({
  imports: [
    MulterModule.register(multerConfig),
    DatabaseModule,
    S3Module,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  controllers: [
    AuthController,
    UserController,
    CreateCategoryController,
    FindAllCategoriesController,
  ],
  providers: [
    ValidateUserUseCase,
    CreateUserUseCase,
    AuthenticateUserUseCase,
    UploadProfileImageUseCase,
    DeleteProfileImageUseCase,
    DeleteUserUseCase,
    RoleGuard,
    {
      provide: UpdateUserUseCase,
      useFactory(repository: UserRepository) {
        return new UpdateUserUseCase(repository);
      },
      inject: [UserRepository],
    },
    {
      provide: LocalStrategy,
      useClass: PassportLocalStrategy,
    },
    {
      provide: JwtStrategy,
      useClass: PassportJwtStrategy,
    },
    {
      provide: FileUploader,
      useClass: LocalFileUploader,
    },
    {
      provide: LocalFileUploader,
      useClass: LocalFileUploader,
    },
    {
      provide: CreateCategoryUseCase,
      useFactory(repository: CategoryRepository, fileUploader: FileUploader) {
        return new CreateCategoryUseCase(repository, fileUploader);
      },
      inject: [CategoryRepository, FileUploader],
    },
    {
      provide: FindAllCategoriesUseCase,
      useFactory(repository: CategoryRepository) {
        return new FindAllCategoriesUseCase(repository);
      },
      inject: [CategoryRepository],
    },
  ],
})
export class HttpModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('auth/login');
  }
}
