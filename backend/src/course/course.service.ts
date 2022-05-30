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
import { CourseNewTeacherDto } from './dto/course.new.teacher.dto';
import { CourseRemoveTeacherDto } from './dto/course.remove.teacher.dto';
import { TeacherFilterDto } from './dto/teacher.filter.dto';
import { SeminarGroupPreviewDto } from './dto/seminar-group.preview.dto';

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
        endType: true,
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
      orderBy: [{ id: 'asc' }],
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
        endType: true,
        credits: true,
        creatorId: true,
        description: true,
        creator: true,
        room: true,
        capacity: true,
        lectureDay: true,
        lectureDurationMin: true,
        lectureStartTimeMin: true,
        seminarGroups: {
          where: {
            deletedAt: null,
          },
          select: {
            id: true,
            seminarGroupDay: true,
            seminarGroupDurationStartTimeMins: true,
            seminarGroupDurationMins: true,
            room: true,
          },
        },
        teachers: {
          where: {
            deletedAt: null,
          },
          select: {
            isLecturer: true,
            isHelper: true,
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
        faculty: true,
        semesterId: true,
        semester: true,
      },
    });

    if (course == null) {
      throw new NotFoundException('Course does not exist');
    }

    return course;
  }

  public async countCapacity(id: number) {
    return await this.prismaService.userCourseSigned.count({
      where: {
        deletedAt: null,
        courseId: id,
      },
    });
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

  public async signUp(id: number, user: User, courseSignup: CourseSignupDto) {
    const course = await this.prismaService.course.findFirst({
      where: {
        id: id,
        deletedAt: null,
      },
      select: {
        capacity: true,
        id: true,
        startSign: true,
        endSign: true,
        creatorId: true,
      },
    });
    if (!course) {
      throw new NotFoundException('Course does not exist');
    }

    const signed = await this.prismaService.userCourseSigned.findFirst({
      where: {
        courseId: id,
        studentId: courseSignup.userId,
      },
    });

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
        signed == null &&
        course.startSign <= currentDate &&
        currentDate <= course.endSign &&
        studentCount < course.capacity &&
        course.creatorId != user.id
      )
    ) {
      throw new ForbiddenException('Can not signup this course');
    }

    try {
      await this.prismaService.userCourseSigned.create({
        data: {
          courseId: id,
          studentId: courseSignup.userId,
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
        creatorId: true,
      },
    });

    if (course == null) {
      throw new NotFoundException('Course does not exist');
    }

    if (!user.roles.includes(UserRole.admin) && course.creatorId != user.id) {
      throw new ForbiddenException('Current user cannot update this course');
    }
  }

  public async removeTeacherFromCourse(
    user: User,
    id: number,
    teacher: CourseRemoveTeacherDto,
  ) {
    await this.checkUser(user, id);

    const teaches = await this.prismaService.userCourseTeaches.findFirst({
      where: {
        deletedAt: null,
        teacherId: teacher.teacherId,
        courseId: id,
      },
      select: {
        id: true,
      },
    });

    try {
      await this.prismaService.userCourseTeaches.update({
        where: {
          id: teaches.id,
        },
        data: {
          deletedAt: new Date(),
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException("Can't remove teacher");
      }
    }
  }

  public async addTeacherInCourse(
    user: User,
    id: number,
    newTeacher: CourseNewTeacherDto,
  ) {
    await this.checkUser(user, id);

    const courseTeaches = await this.prismaService.userCourseTeaches.findFirst({
      where: {
        courseId: id,
        teacherId: newTeacher.teacherId,
        deletedAt: {
          not: null,
        },
      },
    });

    if (courseTeaches != null) {
      throw new ForbiddenException('This teacher already teaches this course');
    }

    try {
      await this.prismaService.userCourseTeaches.create({
        data: {
          courseId: id,
          ...newTeacher,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException("Can't add this user as teacher");
      }
    }
  }

  public async getAvailableTeachers(id: number, filter: TeacherFilterDto) {
    return await this.prismaService.user.findMany({
      where: {
        deletedAt: null,
        coursesTeaches: {
          none: {
            deletedAt: null,
            courseId: id,
          },
        },
        firstName: {
          contains: filter.firstName,
        },
        lastName: {
          contains: filter.lastName,
        },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
      orderBy: [{ id: 'asc' }],
    });
  }

  public async getCourseSemGroups(
    id: number,
  ): Promise<SeminarGroupPreviewDto[]> {
    const groups = await this.prismaService.seminarGroup.findMany({
      where: {
        deletedAt: null,
        courseId: id,
      },
      select: {
        id: true,
        seminarGroupDay: true,
        seminarGroupDurationStartTimeMins: true,
        room: true,
        tutors: {
          select: {
            tutor: {
              select: {
                lastName: true,
              },
            },
          },
          where: {
            deletedAt: null,
          },
        },
      },
    });

    return groups.map((group) => {
      const { tutors, ...rest } = group;
      return { ...rest, tutors: tutors.map((tutor) => tutor.tutor.lastName) };
    });
  }
}
