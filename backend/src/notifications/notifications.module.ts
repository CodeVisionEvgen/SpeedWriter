import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationController } from './notification.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Notify, NotifySchema } from 'src/schemas/notification.schema';

@Module({
  providers: [NotificationsService],
  controllers: [NotificationController],
  exports: [NotificationsService],
  imports: [
    MongooseModule.forFeature([
      {
        schema: NotifySchema,
        name: Notify.name,
      },
    ]),
  ],
})
export class NotificationsModule {}
