import { FileUploader } from '../ports/file-uploader';

export class LocalFileUploader implements FileUploader {
  async upload(file: Express.Multer.File): Promise<string> {
    return file.filename;
  }
}
