import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SeminarGroupService } from './seminar-group.service';
import { CreateSeminarGroupDto } from './dto/create-seminar-group.dto';
import { UpdateSeminarGroupDto } from './dto/update-seminar-group.dto';
import { SeminarGroupPreviewDto } from './dto/seminar-group-preview.dto';
import { PARAMS_ONLY_ID } from '../global-constants';
import { ParseParamsId } from '../global-decorators';

@Controller('subjects/' + PARAMS_ONLY_ID + '/seminar-group')
export class SeminarGroupController {
  constructor(private readonly seminarGroupService: SeminarGroupService) {}

  @Post()
  create(@Body() createSeminarGroupDto: CreateSeminarGroupDto) {
    return this.seminarGroupService.create(createSeminarGroupDto);
  }

  @Get()
  findAll(
    @ParseParamsId() courseId: number,
  ): Promise<SeminarGroupPreviewDto[]> {
    return this.seminarGroupService.getAllPreviews(+courseId);
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
