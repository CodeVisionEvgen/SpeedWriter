import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async create(
    createUserDto: CreateUserDto & {
      UserPicture: string;
      UserProvider: string;
    },
  ): Promise<User & { _id: Types.ObjectId }> {
    return new this.userModel(createUserDto).save();
  }

  findById(_id: string) {
    return this.userModel.findById(_id);
  }

  findByProviderAndEmail(email: string, provider: string) {
    return this.userModel.findOne({
      UserProvider: provider,
      UserName: email,
    });
  }

  findByProviderAndName(name: string, provider: string) {
    return this.userModel.findOne({
      UserProvider: provider,
      UserName: name,
    });
  }

  findByName(nick: string) {
    return this.userModel.findOne({ UserName: nick });
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
