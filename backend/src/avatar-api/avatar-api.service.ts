import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ImageKitClient } from '@platohq/nestjs-imagekit';
import { randomUUID } from 'crypto';
import axios from 'axios';
@Injectable()
export class AvatarApiService {
  constructor(
    private readonly configService: ConfigService,
    private readonly imageKit: ImageKitClient,
  ) {}

  async CreateAvatar(name: string) {
    const url =
      this.configService.get('AVATAR_API_PATH') +
      '?api_key=' +
      this.configService.get('AVATAR_API_SECRET') +
      `&name=${name}`;
    const request = await axios.get(url, {
      responseType: 'arraybuffer',
    });

    return request.data;
  }

  SaveAvatar(image: string): any {
    const fileName = randomUUID();
    return this.imageKit.upload({
      file: image,
      fileName,
      folder: 'avatar',
    });
  }
}
