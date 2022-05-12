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

@Controller('course')
@Roles(UserRole.user)
@UseGuards(AuthenticatedGuard, RolesGuard)
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @Roles(UserRole.admin, UserRole.teacher)
  async create(@Body() courseDto: CourseDto, @GetUser() user: User) {
    return await this.courseService.create(courseDto, user.id);
  }

  @Get()
  async findAll(@Body() filter: CourseFilterDto) {
    return this.courseService.getCoursePreviews(filter);
  }

  @Get(PARAMS_ONLY_ID)
  async findOne(@ParseParamsId() id: number) {
    return this.courseService.findOne(id);
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
}
