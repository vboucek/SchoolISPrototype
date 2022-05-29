import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SeminarGroupService } from './seminar-group.service';
import { CreateSeminarGroupDto } from './dto/create-seminar-group.dto';
import { UpdateSeminarGroupDto } from './dto/update-seminar-group.dto';

@Controller('/seminar-group')
export class SeminarGroupController {
  constructor(private readonly seminarGroupService: SeminarGroupService) {}

  @Post()
  create(@Body() createSeminarGroupDto: CreateSeminarGroupDto) {
    return this.seminarGroupService.create(createSeminarGroupDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seminarGroupService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSeminarGroupDto: UpdateSeminarGroupDto,
  ) {
    return this.seminarGroupService.update(+id, updateSeminarGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seminarGroupService.remove(+id);
  }
}
