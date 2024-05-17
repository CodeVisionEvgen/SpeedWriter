import { Injectable } from '@nestjs/common';
import { CreateStatDto } from './dto/create-stat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserStats } from 'src/schemas/stats.schema';
import { Model, Types } from 'mongoose';
import { Level } from 'src/schemas/level.schema';
import { Document } from 'mongoose';
import { UpdateStatDto } from './dto/update-stat.dto';

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
  // LEVEL ID FOR FIND LEVEL
  async updateByEmail(
    email: string,
    level: Document<unknown, object, Level> &
      Level & {
        _id: Types.ObjectId;
      },
    updateStatDto: UpdateStatDto & { _id: string },
  ) {
    const userStat = await this.userStatsModel.findOne({ ref: email });
    const { stats } = userStat;
    if (!userStat.completedLevels.includes(updateStatDto._id)) {
      stats.Mistakes = stats.Mistakes + updateStatDto.stats.Mistakes;
      stats[level.LevelDifficulty] = stats[level.LevelDifficulty] + 1;
      stats.SpeedWriting =
        stats.SpeedWriting > updateStatDto.stats.SpeedWriting
          ? stats.SpeedWriting
          : updateStatDto.stats.SpeedWriting;
      return await this.userStatsModel.updateOne(
        { ref: email },
        {
          stats,
          $push: {
            completedLevels: level._id.toString(),
          },
        },
      );
    } else {
      return userStat;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} stat`;
  }
}
