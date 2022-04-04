import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res } from '@nestjs/common';
import { SemesterService } from './semester.service';
import { AuthenticatedGuard, RolesGuard } from '../auth/guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { SemesterType, UserRole } from '@prisma/client';
import { PARAMS_ONLY_ID } from '../global-constants';
import { SemesterDto } from './dto';
import { ParseParamsId } from '../global-decorators';

@Controller('semesters')
@Roles(UserRole.admin)
@UseGuards(AuthenticatedGuard,RolesGuard)

export class SemesterController {
  constructor(private readonly semesterService: SemesterService) {}

  @Get('/create')
  public createPage()
  {
    
  }

  @Post('/create')
  async create(@Body() semesterDto: SemesterDto, @Res() res) {
    const semesterId = await this.semesterService.create(semesterDto);
    return res.Redirect('/semesters/semester/' + semesterId.toString);
  }

  @Get('index')
  findAll() {
    return this.semesterService.findAll();
  }

  @Get('/semester/'+PARAMS_ONLY_ID)
  async findOne(@ParseParamsId() id: number) {
    return await this.semesterService.findOne(id);
  }

  @Get('/edit/'+PARAMS_ONLY_ID)
  updatePage(){

  }

  @Patch('/edit/'+PARAMS_ONLY_ID)
  async update(@ParseParamsId() id: number, @Body() semesterDto: SemesterDto) {
    await this.semesterService.update(id, semesterDto);
  }

  @Get('/delete/'+PARAMS_ONLY_ID)
  removePage(){
    
  }

  @Delete('/delete/'+PARAMS_ONLY_ID)
  async remove(@ParseParamsId() id: number) {
    await this.semesterService.remove(id);
  }
}
