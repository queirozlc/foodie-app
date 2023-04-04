import {
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HttpCode } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { FileInterceptor } from '@nestjs/platform-express';
import { unlink as fsUnlink } from 'fs';
import { join } from 'path';
import { RoleName } from 'src/application/enums/role.enum';
import { DeleteProfileImageUseCase } from 'src/application/use-cases/user/delete-proilfe-image.usecase';
import { DeleteUserUseCase } from 'src/application/use-cases/user/delete-user.usecase';
import { UploadProfileImageUseCase } from 'src/application/use-cases/user/upload-profile-image.usecase';
import { S3Service } from 'src/infra/s3/s3.service';
import { promisify } from 'util';
import { multerConfig } from '../../config/multer.config';
import { Roles } from '../../decorators/role.decorator';
import { RoleGuard } from '../../guards/role.guard';

@Controller('users')
export class UserController {
  constructor(
    private readonly s3Service: S3Service,
    private readonly uploadProfileImageUseCase: UploadProfileImageUseCase,
    private readonly deleteProfileImageUseCase: DeleteProfileImageUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Post('/:id/profile-image')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    // For production
    /*
     const bucketKey = `${file.fieldname}-${Date.now()}`;
     const imageUrl = await this.s3Service.uploadFile(file, bucketKey); */

    // For development
    const imageUrl = `http://localhost:3333/${file.filename}`;
    await this.uploadProfileImageUseCase.execute(id, imageUrl);
  }

  @Delete('/:id/profile-image')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async deleteFile(
    @Param('id', new ParseUUIDPipe()) id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // For production

    /* const bucketKey = `${file.fieldname}-${Date.now()}`;
     await this.s3Service.deleteObject(bucketKey);*/

    // For development
    const imagePath = await this.deleteProfileImageUseCase.execute(id);
    await promisify(fsUnlink)(
      join(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        '..',
        '..',
        'tmp',
        'uploads',
        imagePath,
      ),
    );
  }

  @Delete('/:id')
  @Roles(RoleName.ADMIN)
  @UseGuards(RoleGuard)
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.deleteUserUseCase.execute(id);
  }
}
