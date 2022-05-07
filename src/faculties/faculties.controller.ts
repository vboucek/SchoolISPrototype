import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from '@prisma/client';
import { Roles } from '../auth/decorator/roles.decorator';
import { AuthenticatedGuard, RolesGuard } from '../auth/guard';
import { PARAMS_ONLY_ID } from '../global-constants';
import { ParseParamsId } from '../global-decorators';
import { FacultyDto } from './dto';
import { FacultiesService } from './faculties.service';

@Controller('faculties')
@Roles(UserRole.admin)
@UseGuards(AuthenticatedGuard,RolesGuard)
export class FacultiesController {
  constructor(private readonly facultiesService: FacultiesService) { }

  @Post('/create')
  async create(@Body() facultyDto: FacultyDto) {
    return await this.facultiesService.create(facultyDto);
  }

  @Get('index')
  async findAll() {
    return this.facultiesService.findAll();
  }

  @Get('/faculty/' + PARAMS_ONLY_ID)
  async findOne(@ParseParamsId() id: number) {
    return this.facultiesService.findOne(id);
  }

  @Patch('/edit/' + PARAMS_ONLY_ID)
  async update(@ParseParamsId() id: number, @Body() facultyDto: FacultyDto) {
    return this.facultiesService.update(id, facultyDto);
  }
  
  @Delete('/delete/' + PARAMS_ONLY_ID)
  async remove(@ParseParamsId() id: number) {
    return this.facultiesService.remove(id);
  }
}
