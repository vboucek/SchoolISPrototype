import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { CourseFilterDto } from './dto/course.filter.dto';
import { CourseSignupDto } from './dto/course.signup.dto';
import { User, UserRole } from '@prisma/client';
import { CourseDto } from './dto/course.dto';

@Injectable()
export class CourseService {
  constructor(private prismaService: PrismaService) {}

  public async create(courseDto: CourseDto, userId: number) {
    try {
      const newCourse = await this.prismaService.course.create({
        data: {
          creatorId: userId,
          ...courseDto,
        },
      });

      return newCourse.id;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Already exists');
        }
      }
    }
  }

  public async getCoursePreviews(filter: CourseFilterDto) {
    return await this.prismaService.course.findMany({
      where: {
        deletedAt: null,
        credits: {
          gte: filter.creditsMin,
          lte: filter.creditsMax,
        },
        code: {
          contains: filter.code,
        },
        title: {
          contains: filter.title,
        },
        facultyId: filter.facultyId,
        semesterId: filter.semesterId,
      },
      select: {
        id: true,
        code: true,
        title: true,
        credits: true,
        faculty: {
          select: {
            name: true,
          },
        },
        semester: {
          select: {
            semesterType: true,
            year: true,
          },
        },
      },
    });
  }

  public async findOne(id: number) {
    const course = await this.prismaService.course.findFirst({
      where: {
        id: id,
        deletedAt: null,
      },
      select: {
        id: true,
        code: true,
        title: true,
        startSign: true,
        endSign: true,
        credits: true,
        description: true,
        capacity: true,
        lectureDay: true,
        lectureDurationMin: true,
        lectureStartTimeMin: true,
        seminarGroups: {
          select: {
            id: true,
            seminarGroupDay: true,
            seminarGroupDurationStartTimeMins: true,
            seminarGroupDurationMins: true,
          },
        },
        teachers: {
          select: {
            teacher: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        facultyId: true,
        faculty: {
          select: {
            name: true,
          },
        },
        semesterId: true,
        semester: {
          select: {
            semesterType: true,
            year: true,
          },
        },
      },
    });

    if (course == null) {
      throw new NotFoundException('Course does not exist');
    }

    return course;
  }

  public async update(
    user: User,
    id: number,
    courseDto: CourseDto,
  ): Promise<CourseDto> {
    await this.checkUser(user, id);

    try {
      return await this.prismaService.course.update({
        where: {
          id: id,
        },
        data: {
          ...courseDto,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == 'P2002') {
          throw new ForbiddenException('Already exists');
        } else {
          throw new ForbiddenException();
        }
      }
    }
  }

  public async remove(user: User, id: number) {
    await this.checkUser(user, id);

    try {
      await this.prismaService.course.update({
        where: {
          id: id,
        },
        data: {
          deletedAt: new Date(),
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException("Course doesn't exist");
      }
    }
  }

  public async signUp(user: User, courseSignup: CourseSignupDto) {
    const course = await this.prismaService.course.findFirst({
      where: {
        id: courseSignup.courseId,
        deletedAt: null,
      },
      select: {
        capacity: true,
        id: true,
        startSign: true,
        endSign: true,
      },
    });
    if (!course) {
      throw new NotFoundException('Course does not exist');
    }

    const studentCount = await this.prismaService.user.count({
      where: {
        coursesSigned: {
          some: {
            id: course.id,
          },
        },
      },
    });

    const currentDate = new Date();

    if (
      !(
        course.startSign <= currentDate &&
        currentDate <= course.endSign &&
        studentCount < course.capacity
      )
    ) {
      throw new ForbiddenException('Can not signup this course');
    }

    try {
      await this.prismaService.course.update({
        where: {
          id: courseSignup.courseId,
        },
        data: {
          students: {
            connect: {
              id: courseSignup.userId,
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == 'P2002' || error.code == 'P2001') {
          throw new ForbiddenException('Error while signing course');
        } else {
          throw new ForbiddenException();
        }
      }
    }
  }

  private async checkUser(user: User, courseId: number) {
    const course = await this.prismaService.course.findFirst({
      where: {
        id: courseId,
        deletedAt: null,
      },
      select: {
        teachers: true,
      },
    });

    if (course == null) {
      throw new NotFoundException('Course does not exist');
    }

    if (
      !user.roles.includes(UserRole.admin) &&
      !course.teachers.some((x) => x.teacherId == user.id)
    ) {
      throw new ForbiddenException('Curren user can not update this course');
    }
  }
}
