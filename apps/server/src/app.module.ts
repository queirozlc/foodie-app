import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DatabaseModule } from './infra/database/database.module';
import { JwtAuthGuard } from './infra/http/guards/jwt-auth.guard';
import { HttpModule } from './infra/http/http.module';
import { S3Module } from './infra/s3/s3.module';

@Module({
  imports: [
    HttpModule,
    DatabaseModule,
    S3Module,
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'tmp', 'uploads'),
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
