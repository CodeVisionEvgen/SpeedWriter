import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LevelsService } from './levels.service';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { IsObjectIdPipe } from 'nestjs-object-id';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { JwtAdminGuard } from 'src/auth/guards/jwt-admin.guard';

@Controller('levels')
export class LevelsController {
  constructor(private readonly levelsService: LevelsService) {}

  @Post()
  @UseGuards(JwtAdminGuard)
  create(@Body() createLevelDto: CreateLevelDto) {
    return this.levelsService.create(createLevelDto);
  }

  @Get('length')
  getLength() {
    return this.levelsService.getLengthLevels();
  }
  @Get('page/:page')
  findByPage(
    @Param('page') page: string,
    @Query('max') maxDocs: string,
    @Query('q') q: string,
    @Query('diff') diff: string,
  ) {
    return this.levelsService.findByPage(+page, +maxDocs, q, diff);
  }

  @UseGuards(JwtGuard)
  @Get('level/:id')
  findOne(@Param('id', IsObjectIdPipe) id: string) {
    return this.levelsService.findById(id);
  }

  @UseGuards(JwtAdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLevelDto: UpdateLevelDto) {
    return this.levelsService.update(id, updateLevelDto);
  }
  @UseGuards(JwtAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.levelsService.remove(id);
  }
}
