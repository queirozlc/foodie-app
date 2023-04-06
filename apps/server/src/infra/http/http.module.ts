import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserRepository } from 'src/application/repositories/user.repository';
import { JwtStrategy } from 'src/application/strategies/jwt.strategy';
import { LocalStrategy } from 'src/application/strategies/local.strategy';
import { AuthenticateUserUseCase } from 'src/application/use-cases/auth/authenticate-user.usecase';
import { CreateUserUseCase } from 'src/application/use-cases/auth/create-user.usecase';
import { ValidateUserUseCase } from 'src/application/use-cases/auth/validate-user.usecase';
import { DeleteProfileImageUseCase } from 'src/application/use-cases/user/delete-proilfe-image.usecase';
import { DeleteUserUseCase } from 'src/application/use-cases/user/delete-user.usecase';
import { UpdateUserUseCase } from 'src/application/use-cases/user/update-user.usecase';
import { UploadProfileImageUseCase } from 'src/application/use-cases/user/upload-profile-image.usecase';
import { DatabaseModule } from '../database/database.module';
import { S3Module } from '../s3/s3.module';
import { AuthController } from './controllers/auth/auth.controller';
import { UserController } from './controllers/user/user.controller';
import { RoleGuard } from './guards/role.guard';
import { LoginValidationMiddleware } from './middleware/login.middleware';
import { PassportJwtStrategy } from './strategies/passport-jwt.strategy';
import { PassportLocalStrategy } from './strategies/passport-local.strategy';

@Module({
  imports: [
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
  controllers: [AuthController, UserController],
  providers: [
    ValidateUserUseCase,
    CreateUserUseCase,
    AuthenticateUserUseCase,
    UploadProfileImageUseCase,
    DeleteProfileImageUseCase,
    {
      provide: UpdateUserUseCase,
      useFactory(repository: UserRepository) {
        return new UpdateUserUseCase(repository);
      },
      inject: [UserRepository],
    },
    DeleteUserUseCase,
    RoleGuard,
    {
      provide: LocalStrategy,
      useClass: PassportLocalStrategy,
    },
    {
      provide: JwtStrategy,
      useClass: PassportJwtStrategy,
    },
  ],
})
export class HttpModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('auth/login');
  }
}
