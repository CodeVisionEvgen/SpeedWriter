import { Body, Controller, Param, Patch } from '@nestjs/common';
import { UpdateNotifyDto } from './dto/update-notification.dto';
import { NotificationsService } from './notifications.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notifyService: NotificationsService) {}
  @Patch(':email')
  updateNofity(@Body() body: UpdateNotifyDto, @Param('email') email: string) {
    return this.notifyService.updateNofitys(email, body);
  }
}
