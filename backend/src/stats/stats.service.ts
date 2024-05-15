import { Injectable } from '@nestjs/common';
import { CreateStatDto } from './dto/create-stat.dto';
import { UpdateStatDto } from './dto/update-stat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserStats } from 'src/schemas/stats.schema';
import { Model } from 'mongoose';

@Injectable()
export class StatsService {
  constructor(
    @InjectModel(UserStats.name) private userStatsModel: Model<UserStats>,
  ) {}
  async create(createStatDto: CreateStatDto) {
    return new this.userStatsModel(createStatDto).save();
  }

  findAll() {
    return `This action returns all stats`;
  }

  findOne(email: string) {
    return this.userStatsModel.findOne({ ref: email });
  }

  updateByEmail(email: string, updateStatDto: UpdateStatDto) {
    return this.userStatsModel.updateOne({ ref: email }, updateStatDto);
  }

  remove(id: number) {
    return `This action removes a #${id} stat`;
  }
}
