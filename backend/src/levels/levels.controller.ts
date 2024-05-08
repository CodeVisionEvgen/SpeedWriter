import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { LevelsService } from './levels.service';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { IsObjectIdPipe } from 'nestjs-object-id';

@Controller('levels')
export class LevelsController {
  constructor(private readonly levelsService: LevelsService) {}

  @Post()
  create(@Body() createLevelDto: CreateLevelDto) {
    return this.levelsService.create(createLevelDto);
  }

  @Get()
  findAll() {
    return this.levelsService.findAll();
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

  @Get('level/:id')
  findOne(@Param('id', IsObjectIdPipe) id: string) {
    return this.levelsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLevelDto: UpdateLevelDto) {
    return this.levelsService.update(id, updateLevelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.levelsService.remove(id);
  }
}
