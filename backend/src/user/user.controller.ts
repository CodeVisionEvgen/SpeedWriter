import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // @UseGuards(JwtGuard)
  // @Post('')
  // updateUser(@Body() body: UpdateUserDto) {
  //   return this.userService.updateByEmail(body.UserEmail,)
  // }
  @Get(':email')
  async findUserByEmail(@Param('email') email: string) {
    console.log(email);
    return await this.userService.findByEmail(email);
  }
}
