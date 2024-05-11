import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  create(createUserDto: CreateUserDto & { UserPicture: string }) {
    return new this.userModel(createUserDto).save();
  }

  updateByEmail(
    email: string,
    updateUserDto: UpdateUserDto & { UserPicture?: string },
  ) {
    return this.userModel.updateOne({ UserEmail: email }, updateUserDto);
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ UserEmail: email });
  }

  deleteByEmail(email: string) {
    return this.userModel.deleteOne({ UserEmail: email });
  }
}
