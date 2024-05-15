// import { Body, Controller, Post, UseGuards } from '@nestjs/common';
// import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { UserService } from './user.service';

// @Controller('user')
// export class UserController {
//   constructor(private readonly userService: UserService) {}
//   @UseGuards(JwtGuard)
//   @Post('')
//   updateUser(@Body() body: UpdateUserDto) {
//     return this.userService.updateByEmail(body.UserEmail,)
//   }
// }
