import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StatsService } from './stats.service';
import { CreateStatDto } from './dto/create-stat.dto';
import { UpdateStatDto } from './dto/update-stat.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Post()
  create(@Body() createStatDto: CreateStatDto) {
    return this.statsService.create(createStatDto);
  }

  @Get()
  findAll() {
    return this.statsService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.statsService.findOne(email);
  }

  @Patch(':email')
  update(@Param('email') email: string, @Body() updateStatDto: UpdateStatDto) {
    return this.statsService.updateByEmail(email, updateStatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statsService.remove(+id);
  }
}
