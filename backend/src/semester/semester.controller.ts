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

@Controller('semesters')
@UseGuards(AuthenticatedGuard)
export class SemesterController {
  constructor(private readonly semesterService: SemesterService) {}

  @Roles(UserRole.admin)
  @UseGuards(RolesGuard)
  @Post()
  async create(@Body() semesterDto: SemesterDto, @Res() res) {
    const semesterId = await this.semesterService.create(semesterDto);
    return res.Redirect('/semesters/semester/' + semesterId.toString);
  }

  @Get('index')
  findAll() {
    return this.semesterService.findAll();
  }

  @Get(PARAMS_ONLY_ID)
  async findOne(@ParseParamsId() id: number) {
    return await this.semesterService.findOne(id);
  }

  @Roles(UserRole.admin)
  @UseGuards(RolesGuard)
  @Patch(PARAMS_ONLY_ID)
  async update(@ParseParamsId() id: number, @Body() semesterDto: SemesterDto) {
    await this.semesterService.update(id, semesterDto);
  }

  @Roles(UserRole.admin)
  @UseGuards(RolesGuard)
  @Delete(PARAMS_ONLY_ID)
  async remove(@ParseParamsId() id: number) {
    await this.semesterService.remove(id);
  }
}
