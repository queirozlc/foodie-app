import { FileUploader } from '../ports/file-uploader';

export class S3FileUploader implements FileUploader {
  async upload(file: any): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
