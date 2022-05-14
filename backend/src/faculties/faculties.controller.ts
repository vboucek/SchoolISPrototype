import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { Roles } from '../auth/decorator/roles.decorator';
import { AuthenticatedGuard, RolesGuard } from '../auth/guard';
import { PARAMS_ONLY_ID } from '../global-constants';
import { ParseParamsId } from '../global-decorators';
import { FacultyDto } from './dto';
import { FacultiesService } from './faculties.service';

@Controller('faculties')
@UseGuards(AuthenticatedGuard)
export class FacultiesController {
  constructor(private readonly facultiesService: FacultiesService) {}

  @Roles(UserRole.admin)
  @UseGuards(RolesGuard)
  @Post()
  async create(@Body() facultyDto: FacultyDto) {
    return await this.facultiesService.create(facultyDto);
  }

  @Get('index')
  async findAll() {
    return this.facultiesService.findAll();
  }

  @Get(PARAMS_ONLY_ID)
  async findOne(@ParseParamsId() id: number) {
    return this.facultiesService.findOne(id);
  }

  @Roles(UserRole.admin)
  @UseGuards(RolesGuard)
  @Patch(PARAMS_ONLY_ID)
  async update(@ParseParamsId() id: number, @Body() facultyDto: FacultyDto) {
    return this.facultiesService.update(id, facultyDto);
  }

  @Roles(UserRole.admin)
  @UseGuards(RolesGuard)
  @Delete(PARAMS_ONLY_ID)
  async remove(@ParseParamsId() id: number) {
    return this.facultiesService.remove(id);
  }
}
