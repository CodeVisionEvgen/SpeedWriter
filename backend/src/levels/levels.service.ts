import { Injectable } from '@nestjs/common';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { Model } from 'mongoose';
import { Level } from 'src/schemas/level.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class LevelsService {
  constructor(@InjectModel(Level.name) private levelModel: Model<Level>) {}
  async create(createLevelDto: CreateLevelDto) {
    const LastDoc = await this.levelModel.findOne().sort({
      LevelPosition: -1,
    });
    const level = new this.levelModel({
      LevelPosition: LastDoc ? ++LastDoc.LevelPosition : 1,
      ...createLevelDto,
    });
    return await level.save();
  }

  async getLengthLevels() {
    const levelsLength = await this.levelModel.countDocuments();
    const easy = (await this.levelModel.find({ LevelDifficulty: 'easy' }))
      .length;
    const medium = (await this.levelModel.find({ LevelDifficulty: 'medium' }))
      .length;
    const hard = (await this.levelModel.find({ LevelDifficulty: 'hard' }))
      .length;
    return { total: levelsLength, hard, medium, easy };
  }

  async findByPage(
    page: number = 1,
    maxDocs: number = 5,
    q: string = '',
    diff: string = '',
  ) {
    const skip = (page - 1) * maxDocs;
    const docs = this.levelModel
      .aggregate()
      .match({
        LevelName: {
          $regex: q,
          $options: 'i',
        },
        LevelDifficulty: {
          $regex: diff,
          $options: 'i',
        },
      })
      .sort({ LevelPosition: -1 });
    const docCount = (await docs).length;
    return {
      maxPages: Math.ceil(docCount / maxDocs),
      countDocs: docCount,
      docs: await docs.skip(skip).limit(maxDocs),
    };
  }

  findById(id: string) {
    return this.levelModel.findById(id);
  }

  update(id: string, updateLevelDto: UpdateLevelDto) {
    return this.levelModel.updateOne({ _id: id }, updateLevelDto);
  }
  // example ids url?id=234234231,23423534,234234t,34534,521,343
  async remove(ids: string) {
    return this.levelModel.deleteMany({ _id: { $in: ids.split(',') } });
  }
}
