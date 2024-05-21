import { Injectable } from '@nestjs/common';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Achievement } from 'src/schemas/achivevement.schema';
import { Model } from 'mongoose';

@Injectable()
export class AchievementsService {
  constructor(
    @InjectModel(Achievement.name) private achievementModel: Model<Achievement>,
  ) {}
  create(createAchievementDto: CreateAchievementDto) {
    console.log(createAchievementDto);
    return new this.achievementModel(createAchievementDto).save();
  }

  findOne(ref: string) {
    return this.achievementModel.findOne({ ref });
  }

  update(ref: string, updateAchievementDto: UpdateAchievementDto) {
    return this.achievementModel.updateOne({ ref }, updateAchievementDto);
  }

  remove(ref: string) {
    return this.achievementModel.deleteOne({ ref });
  }
}
