import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../auth/decorator/roles.decorator';
import { User, UserRole } from '@prisma/client';
import { AuthenticatedGuard, RolesGuard } from '../auth/guard';
import { PARAMS_ONLY_ID } from '../global-constants';
import { ParseParamsId } from '../global-decorators';
import { CourseService } from './course.service';
import { CourseFilterDto } from './dto/course.filter.dto';
import { GetUser } from '../auth/decorator';
import { CourseDto } from './dto/course.dto';
import { CourseSignupDto } from './dto/course.signup.dto';
import { CourseRemoveTeacherDto } from './dto/course.remove.teacher.dto';
import { CourseNewTeacherDto } from './dto/course.new.teacher.dto';
import { TeacherFilterDto } from './dto/teacher.filter.dto';

@Controller('subjects')
@Roles(UserRole.user)
@UseGuards(AuthenticatedGuard, RolesGuard)
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @Roles(UserRole.admin, UserRole.teacher)
  async create(@Body() courseDto: CourseDto, @GetUser() user: User) {
    return await this.courseService.create(courseDto, user.id);
  }

  @Post('/previews')
  async findAll(@Body() filter: CourseFilterDto) {
    return this.courseService.getCoursePreviews(filter);
  }

  @Get(PARAMS_ONLY_ID)
  async findOne(@ParseParamsId() id: number) {
    return this.courseService.findOne(id);
  }

  @Get(PARAMS_ONLY_ID + '/count')
  async countCapacity(@ParseParamsId() id: number) {
    return this.courseService.countCapacity(id);
  }

  @Patch(PARAMS_ONLY_ID)
  @Roles(UserRole.admin, UserRole.teacher)
  async update(
    @ParseParamsId() id: number,
    @Body() courseDto: CourseDto,
    @GetUser() user: User,
  ) {
    return this.courseService.update(user, id, courseDto);
  }

  @Delete(PARAMS_ONLY_ID)
  @Roles(UserRole.admin, UserRole.teacher)
  async remove(@ParseParamsId() id: number, @GetUser() user: User) {
    return this.courseService.remove(user, id);
  }

  @Delete(PARAMS_ONLY_ID + '/teacher')
  @Roles(UserRole.admin, UserRole.teacher)
  async removeTeacher(
    @ParseParamsId() id: number,
    @GetUser() user: User,
    @Body() teacherDto: CourseRemoveTeacherDto,
  ) {
    return this.courseService.removeTeacherFromCourse(user, id, teacherDto);
  }

  @Post(PARAMS_ONLY_ID + '/teacher')
  @Roles(UserRole.admin, UserRole.teacher)
  async addTeacher(
    @ParseParamsId() id: number,
    @Body() newTeacherDto: CourseNewTeacherDto,
    @GetUser() user: User,
  ) {
    return this.courseService.addTeacherInCourse(user, id, newTeacherDto);
  }

  @Post(PARAMS_ONLY_ID + '/teachers')
  @Roles(UserRole.admin, UserRole.teacher)
  async getAvailableTeachers(
    @ParseParamsId() id: number,
    @Body() teacherFilterDto: TeacherFilterDto,
  ) {
    return this.courseService.getAvailableTeachers(id, teacherFilterDto);
  }

  @Post(PARAMS_ONLY_ID + '/signup')
  @Roles(UserRole.user)
  async signUp(
    @ParseParamsId() id: number,
    @Body() signUp: CourseSignupDto,
    @GetUser() user: User,
  ) {
    return this.courseService.signUp(id, user, signUp);
  }
}
