import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model, Types } from 'mongoose';
import { StatsService } from 'src/stats/stats.service';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class UserService {
  constructor(
    private readonly statsService: StatsService,
    private readonly notifyService: NotificationsService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async create(
    createUserDto: CreateUserDto & {
      UserPicture: string;
      UserProvider: string;
    },
  ): Promise<User & { _id: Types.ObjectId }> {
    await this.statsService.create({ ref: createUserDto.UserEmail });
    await this.notifyService.createNotify(
      createUserDto.UserEmail,
      'Congratulations on registering in our application',
    );
    return new this.userModel(createUserDto).save();
  }

  findById(_id: string) {
    return this.userModel.findById(_id);
  }

  findByProviderAndEmail(email: string, provider: string) {
    return this.userModel.findOne({
      UserProvider: provider,
      UserEmail: email,
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

  async findByEmail(email: string) {
    const user = await this.userModel
      .aggregate()
      .match({ UserEmail: email })
      .lookup({
        from: 'userstats',
        as: 'stats',
        foreignField: 'ref',
        localField: 'UserEmail',
      })
      .project({
        stats: {
          _id: 0,
          ref: 0,
          __v: 0,
          createdAt: 0,
          updatedAt: 0,
        },
      })
      .unwind({
        path: '$stats',
      })
      .lookup({
        from: 'notifies',
        as: 'notifies',
        foreignField: 'ref',
        localField: 'UserEmail',
      })
      .project({
        notifies: {
          _id: 0,
          ref: 0,
          __v: 0,
          updatedAt: 0,
        },
      });
    if (user.length) {
      return {
        ...user[0],
        stats: user[0]?.stats
          ? {
              ...user[0].stats.stats,
              completedLevels: user[0].stats.completedLevels,
            }
          : {},
      };
    } else return undefined;
  }

  deleteByEmail(email: string) {
    return this.userModel.deleteOne({ UserEmail: email });
  }
}
