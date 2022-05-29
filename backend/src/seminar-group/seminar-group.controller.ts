import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SeminarGroupService } from './seminar-group.service';
import { CreateSeminarGroupDto } from './dto/create-seminar-group.dto';
import { UpdateSeminarGroupDto } from './dto/update-seminar-group.dto';
import { ParseParamsId } from '../global-decorators';
import { User, UserRole } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { SeminarGroupRemoveTutorDto } from './dto/seminar-group.remove.tutor.dto';
import { PARAMS_ONLY_ID } from '../global-constants';
import { Roles } from '../auth/decorator/roles.decorator';
import { AuthenticatedGuard, RolesGuard } from '../auth/guard';
import { SeminarGroupRemoveStudentDto } from './dto/seminar-group.remove.student.dto';

@Controller('/seminar-group')
@Roles(UserRole.user)
@UseGuards(AuthenticatedGuard, RolesGuard)
export class SeminarGroupController {
  constructor(private readonly seminarGroupService: SeminarGroupService) {}

  @Post()
  create(@Body() createSeminarGroupDto: CreateSeminarGroupDto) {
    return this.seminarGroupService.create(createSeminarGroupDto);
  }

  @Get(PARAMS_ONLY_ID)
  findOne(@ParseParamsId() id: number) {
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

  @Delete(PARAMS_ONLY_ID + '/tutor')
  @Roles(UserRole.admin, UserRole.teacher)
  async removeTutor(
    @ParseParamsId() id: number,
    @GetUser() user: User,
    @Body() tutorDto: SeminarGroupRemoveTutorDto,
  ) {
    return this.seminarGroupService.removeTutorFromSemGroup(user, id, tutorDto);
  }

  @Delete(PARAMS_ONLY_ID + '/student')
  @Roles(UserRole.admin, UserRole.teacher, UserRole.user)
  async removeStudent(
    @ParseParamsId() id: number,
    @GetUser() user: User,
    @Body() studentDto: SeminarGroupRemoveStudentDto,
  ) {
    return this.seminarGroupService.removeStudentFromSemGroup(
      user,
      id,
      studentDto,
    );
  }
}
