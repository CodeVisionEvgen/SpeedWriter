import { PartialType } from '@nestjs/mapped-types';
import { CreateNotifyDto } from './create-notification.dto';

export class UpdateNotifyDto extends PartialType(CreateNotifyDto) {}
