import { Injectable } from '@nestjs/common';
import ImageKit from 'imagekit';
import { Express } from 'express';

@Injectable()
export class UploadService {
  private imagekit: ImageKit;

  constructor() {
    this.imagekit = new ImageKit({
      publicKey: 'public_wKVZlrs42P6nKLatVnpz32IKpEA=',
      privateKey: 'private_O1IvbZIrvuODRrgCzFKbQo9q+V0=',
      urlEndpoint: 'https://ik.imagekit.io/t1tnhcnfb',
    });
  }

  async uploadToImageKit(file: Express.Multer.File) {
    const result = await this.imagekit.upload({
      file: file.buffer,
      fileName: file.originalname,
    });

    return {
      url: result.url,
      fileId: result.fileId,
    };
  }
}
