export abstract class FileUploader {
  abstract upload(file: any): Promise<string>;
}
