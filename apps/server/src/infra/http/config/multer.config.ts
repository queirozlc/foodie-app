import { BadRequestException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as crypto from 'crypto';
import { diskStorage } from 'multer';
import * as path from 'path';

const storageTypes = {
  local: diskStorage({
    destination(req, file, callback) {
      callback(
        null,
        path.resolve(__dirname, '..', '..', '..', '..', '..', 'tmp', 'uploads'),
      );
    },
    filename(req, file, callback) {
      crypto.randomBytes(16, (err, hash) => {
        if (err) {
          return callback(err, null);
        }
        const fileName = `${hash.toString('hex')}-${file.originalname}`;
        callback(null, fileName);
      });
    },
  }),
};

export const multerConfig: MulterOptions = {
  dest: path.resolve(__dirname, '..', '..', '..', '..', '..', 'tmp', 'uploads'),
  storage: storageTypes['local'],
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter(req, file, callback) {
    const allowedMimes = [
      'image/jpeg',
      'image/png',
      'image/jpg',
      'image/gif',
      'image/pjpeg',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new BadRequestException('Invalid file type'), false);
    }
  },
};
