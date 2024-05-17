import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { StatsService } from './stats.service';
import { CreateStatDto } from './dto/create-stat.dto';
import { UpdateStatDto } from './dto/update-stat.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { LevelsService } from 'src/levels/levels.service';

@Controller('stats')
export class StatsController {
  constructor(
    private readonly statsService: StatsService,
    @Inject(LevelsService) private readonly levelService: LevelsService,
  ) {}

  @Post()
  create(@Body() createStatDto: CreateStatDto) {
    return this.statsService.create(createStatDto);
  }

  @Get()
  findAll() {
    return this.statsService.findAll();
  }

  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.statsService.findOne(email);
  }

  @UseGuards(JwtGuard)
  @Patch(':email')
  async update(
    @Param('email') email: string,
    @Body() updateStatDto: UpdateStatDto & { _id: string },
  ) {
    const level = await this.levelService.findById(updateStatDto._id);
    if (!level) throw new BadRequestException();
    const user = await this.statsService.findOne(email);
    if (!user) throw new BadRequestException();
    return await this.statsService.updateByEmail(email, level, updateStatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statsService.remove(+id);
  }
}
