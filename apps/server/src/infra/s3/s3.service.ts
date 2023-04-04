import {
  DeleteObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common/exceptions/internal-server-error.exception';
import { Logger } from '@nestjs/common/services/logger.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private logger = new Logger(S3Service.name);
  private region: string;
  private s3: S3Client;

  constructor(private config: ConfigService) {
    this.region = this.config.get('S3_REGION');
    this.s3 = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.config.get('S3_ACCESS'),
        secretAccessKey: this.config.get('S3_SECRET'),
      },
    });
  }

  async uploadFile(file: Express.Multer.File, key: string): Promise<string> {
    const bucket = this.config.get<string>('S3_BUCKET');
    const input: PutObjectCommandInput = {
      Bucket: bucket,
      Key: key,
      ContentType: file.mimetype,
      ACL: 'public-read',
      Body: file.buffer,
    };

    try {
      const response = await this.s3.send(new PutObjectCommand(input));

      if (response.$metadata.httpStatusCode === 200) {
        return `https://${bucket}.s3.${this.region}.amazonaws.com/${file.filename}`;
      }

      throw new InternalServerErrorException('Error uploading file');
    } catch (error) {
      this.logger.error('Cannot save file to S3', error);
      throw new Error('Cannot save file to S3');
    }
  }

  async deleteObject(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.config.get('S3_BUCKET'),
      Key: key,
    });
    const response = await this.s3.send(command);

    if (response.$metadata.httpStatusCode === 200) {
      return;
    }
    throw new InternalServerErrorException('Error deleting file from S3');
  }
}
