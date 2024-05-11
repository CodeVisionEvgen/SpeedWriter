import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  async comparePasswords(
    fingerPrint: string,
    userPrint: string,
  ): Promise<boolean> {
    return await bcrypt.compare(fingerPrint, userPrint);
  }
}
