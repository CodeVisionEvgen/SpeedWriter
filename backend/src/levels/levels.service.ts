import { Injectable } from '@nestjs/common';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { Model } from 'mongoose';
import { Level } from 'schemas/level.schema';
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

  findAll() {
    return this.levelModel.find();
  }

  async findByPage(
    page: number = 1,
    maxDocs: number = 5,
    q: string = '',
    diff: string = '',
  ) {
    const countDocs = await this.levelModel.find().countDocuments();
    const maxPages = Math.ceil(countDocs / maxDocs);
    const skip = (page - 1) * maxDocs;
    const docs = await this.levelModel
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
      .sort({ LevelPosition: -1 })
      .skip(skip)
      .limit(maxDocs);

    return {
      maxPages,
      countDocs,
      docs,
    };
  }

  findOne(id: string) {
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
