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

  findOne(id: number) {
    return `This action returns a #${id} level`;
  }

  update(id: number, updateLevelDto: UpdateLevelDto) {
    return `This action updates a #${id} ${updateLevelDto} level`;
  }

  remove(id: number) {
    return `This action removes a #${id} level`;
  }
}
