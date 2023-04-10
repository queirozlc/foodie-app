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
import { Body, HttpCode, Put } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { FileInterceptor } from '@nestjs/platform-express';
import { unlink as fsUnlink } from 'fs';
import { join } from 'path';
import { RoleName } from 'src/application/enums/role.enum';
import { UploadFileProvider } from 'src/application/ports/upload-file-provider.service';
import { DeleteProfileImageUseCase } from 'src/application/use-cases/user/delete-proilfe-image.usecase';
import { DeleteUserUseCase } from 'src/application/use-cases/user/delete-user.usecase';
import { UpdateUserUseCase } from 'src/application/use-cases/user/update-user.usecase';
import { UploadProfileImageUseCase } from 'src/application/use-cases/user/upload-profile-image.usecase';
import { promisify } from 'util';
import { Roles } from '../../decorators/role.decorator';
import { UpdateUserDto } from '../../dtos/update-user.dto';
import { RoleGuard } from '../../guards/role.guard';

@Controller('users')
export class UserController {
  constructor(
    private readonly uploadProfileImageUseCase: UploadProfileImageUseCase,
    private readonly deleteProfileImageUseCase: DeleteProfileImageUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly uploadFileProvider: UploadFileProvider,
  ) {}

  @Post('/:id/profile-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    // For production
    //  const imageUrl = await this.uploadFileProvider.uploadFile(file, `${file.fieldname}-${Date.now()}`);

    // For development
    const imageUrl = `http://localhost:3333/${file.filename}`;
    await this.uploadProfileImageUseCase.execute(id, imageUrl);
  }

  @Delete('/:id/profile-image')
  @UseInterceptors(FileInterceptor('file'))
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

  @Put('/:id')
  @Roles(RoleName.COSTUMER, RoleName.ADMIN)
  @UseGuards(RoleGuard)
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() request: UpdateUserDto,
  ) {
    return await this.updateUserUseCase.execute(id, request);
  }
}
