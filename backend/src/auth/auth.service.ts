import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { JWT } from 'src/schemas/jwt.schema';
import { User } from 'src/schemas/user.schema';
import { JwtType } from 'types/jwt.type';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(JWT.name) private readonly jwtModel: Model<JWT>,
  ) {}

  async saveJwtTokens(tokens: JwtType) {
    return new this.jwtModel(tokens).save();
  }
  async hashPassword(pwd: string): Promise<string> {
    return await bcrypt.hash(pwd, 10);
  }

  async comparePasswords(
    fingerPrint: string,
    userPrint: string,
  ): Promise<boolean> {
    return await bcrypt.compare(fingerPrint, userPrint);
  }

  jwtDecode(token: string): unknown {
    return this.jwtService.decode(token);
  }

  jwtVerify(token: string) {
    return this.jwtService.verify(token);
  }

  findJwt(refreshToken: string) {
    return this.jwtModel.findOne({ refreshToken });
  }

  deleteJwt(refreshToken: string) {
    return this.jwtModel.deleteOne({ refreshToken });
  }

  async genJwtTokens(
    AccessPayload: Omit<User, 'UserPassword' | 'UserProvider'>,
    RefreshPayload: string,
  ): Promise<JwtType> {
    return {
      accessToken: await this.jwtService.signAsync(AccessPayload, {
        expiresIn: '2h',
      }),
      refreshToken: await this.jwtService.signAsync(
        { _id: RefreshPayload },
        {
          expiresIn: '3d',
        },
      ),
    };
  }
}
