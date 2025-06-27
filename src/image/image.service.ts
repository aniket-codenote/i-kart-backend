import { Injectable } from '@nestjs/common';
import ImageKit = require("imagekit");

@Injectable()
export class ImageService {
  private imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
  });

  async uploadBase64Image(base64: string) {
    const uploadResponse = await this.imagekit.upload({
      file: base64,
      fileName: `upload_${Date.now()}.jpg`,
    });

    return uploadResponse.url;
  }
}
