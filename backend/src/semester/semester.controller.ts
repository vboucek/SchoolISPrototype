import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  Res,
} from '@nestjs/common';
import { SemesterService } from './semester.service';
import { AuthenticatedGuard, RolesGuard } from '../auth/guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { UserRole } from '@prisma/client';
import { PARAMS_ONLY_ID } from '../global-constants';
import { SemesterDto } from './dto';
import { ParseParamsId } from '../global-decorators';
import { SemesterCreateDto } from './dto/semester-create.dto';

@Controller('semesters')
@Roles(UserRole.user)
@UseGuards(AuthenticatedGuard, RolesGuard)
export class SemesterController {
  constructor(private readonly semesterService: SemesterService) {}

  
  @Post()
  @Roles(UserRole.admin)
  @UseGuards(RolesGuard)
  async create(@Body() semesterDto: SemesterCreateDto) {
    return await this.semesterService.create(semesterDto);
  }

  @Get()
  async findAll() {
    return await this.semesterService.findAll();
  }

  @Get(PARAMS_ONLY_ID)
  async findOne(@ParseParamsId() id: number) {
    return await this.semesterService.findOne(id);
  }
  
  @Patch(PARAMS_ONLY_ID)
  @Roles(UserRole.admin)
  @UseGuards(RolesGuard)
  async update(@ParseParamsId() id: number, @Body() semesterDto: SemesterCreateDto) {
    return await this.semesterService.update(id, semesterDto);
  }
  
  @Delete(PARAMS_ONLY_ID)
  @Roles(UserRole.admin)
  @UseGuards(RolesGuard)
  async remove(@ParseParamsId() id: number) {
    return await this.semesterService.remove(id);
  }
}
