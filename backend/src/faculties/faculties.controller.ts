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
import { FacultyCreateDto } from './dto/facutly-create.dto';
import { FacultiesService } from './faculties.service';

@Controller('faculties')
@Roles(UserRole.user)
@UseGuards(AuthenticatedGuard, RolesGuard)
export class FacultiesController {
  constructor(private readonly facultiesService: FacultiesService) {}
  
  @Post()
  @Roles(UserRole.admin)
  async create(@Body() facultyDto: FacultyCreateDto) {
    return await this.facultiesService.create(facultyDto);
  }

  @Get()
  async findAll() {
    return this.facultiesService.findAll();
  }

  @Get(PARAMS_ONLY_ID)
  async findOne(@ParseParamsId() id: number) {
    return this.facultiesService.findOne(id);
  }
  
  @Patch(PARAMS_ONLY_ID)
  @Roles(UserRole.admin)
  async update(@ParseParamsId() id: number, @Body() facultyDto: FacultyCreateDto) {
    return this.facultiesService.update(id, facultyDto);
  }
  
  @Delete(PARAMS_ONLY_ID)
  @Roles(UserRole.admin)
  async remove(@ParseParamsId() id: number) {
    return this.facultiesService.remove(id);
  }
}
