export abstract class UploadFileProvider {
  abstract uploadFile(file: Express.Multer.File, key?: string): Promise<string>;
}
