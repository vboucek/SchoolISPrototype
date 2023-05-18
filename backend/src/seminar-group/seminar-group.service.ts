import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, UserRole } from '@prisma/client';
import { SeminarGroupRemoveTutorDto } from './dto/seminar-group.remove.tutor.dto';
import { SeminarGroupRemoveStudentDto } from './dto/seminar-group.remove.student.dto';
import { SeminarGroupNewTutorDto } from './dto/seminar-group.new.tutor.dto';
import { TutorFilterDto } from './dto/tutor.filter.dto';
import { SeminarGroupNewStudentDto } from './dto/seminar-group.new.student.dto';
import { SeminarGroupDto } from './dto/seminar-group.dto';

interface ValidateOptions {
  allowAdmin?: boolean;
  allowTeacher?: boolean;
  allowCourseCreator?: boolean;
  allowAffectedUser?: boolean;
}

@Injectable()
export class SeminarGroupService {
  constructor(private prismaService: PrismaService) {}

  private async validateUser(
    user: User,
    affectedId: number,
    groupId?: number,
    options?: ValidateOptions,
  ) {
    if (options.allowAdmin && user.roles.includes(UserRole.admin)) return;
    if (options.allowTeacher && user.roles.includes(UserRole.teacher)) return;
    if (options.allowAffectedUser && user.id === affectedId) return;

    if (groupId) {
      const group = await this.prismaService.seminarGroup.findFirst({
        where: {
          id: groupId,
          deletedAt: null,
        },
        select: {
          course: {
            select: {
              creatorId: true,
            },
          },
        },
      });

      if (group == null) throw new NotFoundException();
      if (options.allowCourseCreator && user.id === group.course.creatorId)
        return;
    }

    throw new ForbiddenException();
  }

  findOne(id: number) {
    const group = this.prismaService.seminarGroup.findFirst({
      where: {
        id: id,
        deletedAt: null,
      },
      select: {
        id: true,
        name: true,
        seminarGroupDay: true,
        seminarGroupDurationStartTimeMins: true,
        seminarGroupDurationMins: true,
        capacity: true,
        room: true,
        course: {
          select: {
            id: true,
            creatorId: true,
            code: true,
            credits: true,
            endType: true,
            startSign: true,
            endSign: true,
            faculty: {
              select: {
                name: true,
              },
            },
          },
        },
        tutors: {
          select: {
            tutor: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
          where: {
            deletedAt: null,
          },
        },
        students: {
          select: {
            student: {
              select: {
                id: true,
                firstName: true,
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

    if (group == null) throw new NotFoundException();
    return group;
  }

  public async deleteGroup(id: number, user: User) {
    await this.validateUser(user, id, id, {
      allowAdmin: true,
      allowCourseCreator: true,
    });

    await this.prismaService.seminarGroup.update({
      where: {
        id: id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  public async createGroup(group: SeminarGroupDto, user: User) {
    await this.validateUser(user, user.id, undefined, {
      allowAdmin: true,
      allowTeacher: true,
    });

    const newGroup = await this.prismaService.seminarGroup.create({
      data: {
        ...group,
      },
    });

    return newGroup.id;
  }

  public async updateGroup(user: User, id: number, group: SeminarGroupDto) {
    await this.validateUser(user, id, id, {
      allowAdmin: true,
      allowCourseCreator: true,
    });

    return await this.prismaService.seminarGroup.update({
      where: {
        id: id,
      },
      data: {
        ...group,
      },
    });
  }

  public async removeTutorFromSemGroup(
    user: User,
    id: number,
    tutor: SeminarGroupRemoveTutorDto,
  ) {
    await this.validateUser(user, tutor.tutorId, id, {
      allowAdmin: true,
      allowCourseCreator: true,
    });

    const teaches = await this.prismaService.userSeminarGroupTeaches.findFirst({
      where: {
        deletedAt: null,
        seminarGroupId: id,
        tutorId: tutor.tutorId,
      },
      select: {
        id: true,
      },
    });

    if (teaches === null) throw new NotFoundException();
    await this.prismaService.userSeminarGroupTeaches.update({
      where: {
        id: teaches.id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  public async removeStudentFromSemGroup(
    user: User,
    id: number,
    student: SeminarGroupRemoveStudentDto,
  ) {
    await this.validateUser(user, student.studentId, id, {
      allowAdmin: true,
      allowCourseCreator: true,
      allowAffectedUser: true,
    });

    const studies = await this.prismaService.userSeminarGroupSigned.findFirst({
      where: {
        deletedAt: null,
        seminarGroupId: id,
        studentId: student.studentId,
      },
      select: {
        id: true,
        seminarGroup: {
          select: {
            course: {
              select: {
                startSign: true,
                endSign: true,
              },
            },
          },
        },
      },
    });

    if (studies == null) throw new NotFoundException();

    if (student.studentId === user.id) {
      const now = new Date();
      if (
        now < studies.seminarGroup.course.startSign ||
        now > studies.seminarGroup.course.endSign
      ) {
        throw new BadRequestException(
          "You can't sign out from this seminar group now",
        );
      }
    }

    await this.prismaService.userSeminarGroupSigned.update({
      where: {
        id: studies.id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  public async addTutorToSemGroup(
    user: User,
    id: number,
    tutor: SeminarGroupNewTutorDto,
  ) {
    await this.validateUser(user, tutor.tutorId, id, {
      allowAdmin: true,
      allowCourseCreator: true,
    });

    const teaches = await this.prismaService.userSeminarGroupTeaches.findFirst({
      where: {
        deletedAt: null,
        seminarGroupId: id,
        tutorId: tutor.tutorId,
      },
    });

    if (teaches) throw new BadRequestException();
    await this.prismaService.userSeminarGroupTeaches.create({
      data: {
        seminarGroupId: id,
        tutorId: tutor.tutorId,
      },
    });
  }

  public async getAvailableTutors(id: number, filter: TutorFilterDto) {
    return await this.prismaService.user.findMany({
      where: {
        deletedAt: null,
        seminarGroupTeaches: {
          none: {
            deletedAt: null,
            seminarGroupId: id,
          },
        },
        firstName: {
          contains: filter.firstName ?? undefined,
        },
        lastName: {
          contains: filter.lastName ?? undefined,
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

  public async countCapacity(id: number) {
    return await this.prismaService.userSeminarGroupSigned.count({
      where: {
        deletedAt: null,
        seminarGroupId: id,
      },
    });
  }

  public async addStudent(
    id: number,
    user: User,
    newStudent: SeminarGroupNewStudentDto,
  ) {
    await this.validateUser(user, newStudent.studentId, id, {
      allowAffectedUser: true,
    });

    const group = await this.prismaService.seminarGroup.findFirst({
      where: {
        id: id,
        deletedAt: null,
      },
      select: {
        capacity: true,
        course: {
          select: {
            id: true,
            startSign: true,
            endSign: true,
          },
        },
      },
    });

    if (!group) throw new NotFoundException();

    const occupied = await this.countCapacity(id);
    if (occupied >= group.capacity)
      throw new BadRequestException('Seminar group is full');

    const now = new Date();
    if (now < group.course.startSign || now > group.course.endSign) {
      throw new BadRequestException(
        "You can't sign up for this seminar group now",
      );
    }

    const student = await this.prismaService.user.findFirst({
      where: {
        id: newStudent.studentId,
        deletedAt: null,
      },
      select: {
        id: true,
        coursesSigned: {
          select: {
            id: true,
          },
          where: {
            courseId: group.course.id,
            deletedAt: null,
          },
        },
        seminarGroupSigned: {
          select: {
            id: true,
          },
          where: {
            courseId: group.course.id,
            deletedAt: null,
            seminarGroup: {
              deletedAt: null,
            },
          },
        },
      },
    });

    if (student == null) throw new NotFoundException('Student not found');
    if (student.coursesSigned.length === 0) {
      throw new BadRequestException(
        'You have to sign up for this course first',
      );
    }
    if (student.seminarGroupSigned.length > 0) {
      throw new BadRequestException(
        'You have already signed up for another seminar group in this course',
      );
    }

    await this.prismaService.userSeminarGroupSigned.create({
      data: {
        seminarGroupId: id,
        studentId: newStudent.studentId,
        courseId: group.course.id,
      },
    });
  }
}
