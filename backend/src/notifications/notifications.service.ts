import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notify } from 'src/schemas/notification.schema';
import { UpdateNotifyDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(@InjectModel(Notify.name) private notifyModel: Model<Notify>) {}
  createNotify(ref: string, message: string) {
    return new this.notifyModel({ ref, message }).save();
  }
  updateNofitys(ref: string, body: UpdateNotifyDto) {
    return this.notifyModel.updateMany({ ref }, body);
  }
}
