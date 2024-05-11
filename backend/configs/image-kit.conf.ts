import { ConfigService } from '@nestjs/config';

export const ImageKitConfigFactory = (configService: ConfigService) => {
  return {
    publicKey: configService.get('IMAGE_KIT_PUBLIC_TOKEN'),
    privateKey: configService.get('IMAGE_KIT_SECRET_TOKEN'),
    urlEndpoint: configService.get('IMAGE_KIT_URL'),
  };
};
