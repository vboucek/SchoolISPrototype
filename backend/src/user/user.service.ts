import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Day, User, UserRole } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './dto';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateUserDto } from './dto/user-update-user.dto';
import { UserSubjectsFilterDto } from './dto/user-subjects-filter.dto';
import { AdminUpdateUserDto } from './dto/admin-update-user.dto';
import { UserFilterDto } from './dto/user.filter.dto';
import { UserTimetableFilterDto } from './dto/user.timetable.filter.dto';
import { UserTimetableDto } from './dto/user.timetable.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  public async getUserDto(userId: number) {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: userId,
        deletedAt: null,
      },
    });

    if (!user) {
      return new NotFoundException('User not found');
    }

    return plainToInstance<UserDto, User>(
      UserDto,
      { ...user },
      { excludeExtraneousValues: true },
    );
  }

  public async getUserPreviews(filter: UserFilterDto) {
    let users;

    if ('abcdefghijklmnopqrstuvwxyz'.includes(filter.lastnameLetter)) {
      users = await this.prismaService.user.findMany({
        where: {
          deletedAt: null,
          lastName: {
            startsWith: filter.lastnameLetter,
            mode: 'insensitive',
          },
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      });
    } else {
      users = await this.prismaService.user.findMany({
        where: {
          deletedAt: null,
          NOT: {
            OR: [
              { lastName: { startsWith: 'A', mode: 'insensitive' } },
              { lastName: { startsWith: 'B', mode: 'insensitive' } },
              { lastName: { startsWith: 'C', mode: 'insensitive' } },
              { lastName: { startsWith: 'D', mode: 'insensitive' } },
              { lastName: { startsWith: 'E', mode: 'insensitive' } },
              { lastName: { startsWith: 'F', mode: 'insensitive' } },
              { lastName: { startsWith: 'G', mode: 'insensitive' } },
              { lastName: { startsWith: 'H', mode: 'insensitive' } },
              { lastName: { startsWith: 'I', mode: 'insensitive' } },
              { lastName: { startsWith: 'J', mode: 'insensitive' } },
              { lastName: { startsWith: 'K', mode: 'insensitive' } },
              { lastName: { startsWith: 'L', mode: 'insensitive' } },
              { lastName: { startsWith: 'M', mode: 'insensitive' } },
              { lastName: { startsWith: 'N', mode: 'insensitive' } },
              { lastName: { startsWith: 'O', mode: 'insensitive' } },
              { lastName: { startsWith: 'P', mode: 'insensitive' } },
              { lastName: { startsWith: 'Q', mode: 'insensitive' } },
              { lastName: { startsWith: 'R', mode: 'insensitive' } },
              { lastName: { startsWith: 'S', mode: 'insensitive' } },
              { lastName: { startsWith: 'T', mode: 'insensitive' } },
              { lastName: { startsWith: 'U', mode: 'insensitive' } },
              { lastName: { startsWith: 'V', mode: 'insensitive' } },
              { lastName: { startsWith: 'W', mode: 'insensitive' } },
              { lastName: { startsWith: 'X', mode: 'insensitive' } },
              { lastName: { startsWith: 'Y', mode: 'insensitive' } },
              { lastName: { startsWith: 'Z', mode: 'insensitive' } },
            ],
          },
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      });
    }

    return users;
  }

  public async create(createUserDto: UserCreateDto) {
    try {
      const hash = await argon.hash(createUserDto.password);

      const roles = Array.from(
        new Set([...createUserDto.roles, UserRole.user]),
      );

      const createdUser = await this.prismaService.user.create({
        data: {
          email: createUserDto.email,
          passwdHash: hash,

          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName,

          roles: roles,

          semesterId: createUserDto.semesterId,
          facultyId: createUserDto.facultyId,
        },
      });

      return plainToInstance<UserDto, User>(
        UserDto,
        { ...createdUser },
        { excludeExtraneousValues: true },
      );
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  public async updateUserHimself(
    userToUpdateId: number,
    updateDataDto: UserUpdateUserDto,
  ) {
    try {
      const user = await this.prismaService.user.findFirst({
        where: {
          id: userToUpdateId,
          deletedAt: null,
        },
      });

      if (!user) {
        return new NotFoundException();
      }

      const hash = await argon.hash(updateDataDto.password);

      const updatedUser = await this.prismaService.user.update({
        where: {
          id: userToUpdateId,
        },
        data: {
          firstName: updateDataDto.firstName,
          lastName: updateDataDto.lastName,
          email: updateDataDto.email,
          passwdHash: hash,
        },
      });

      return plainToInstance<UserDto, User>(
        UserDto,
        { ...updatedUser },
        { excludeExtraneousValues: true },
      );
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException();
      }
    }
  }

  public async updateUserAdmin(
    userToUpdateId: number,
    updateDataDto: AdminUpdateUserDto,
  ) {
    try {
      const user = await this.prismaService.user.findFirst({
        where: {
          id: userToUpdateId,
          deletedAt: null,
        },
      });

      if (!user) {
        return new NotFoundException();
      }

      const hash = updateDataDto.password
        ? await argon.hash(updateDataDto.password)
        : user.passwdHash;

      updateDataDto.roles = Array.from(
        new Set([...updateDataDto.roles, UserRole.user]),
      );

      const updatedUser = await this.prismaService.user.update({
        where: {
          id: userToUpdateId,
        },
        data: {
          firstName: updateDataDto.firstName,
          lastName: updateDataDto.lastName,
          email: updateDataDto.email,
          passwdHash: hash,
          roles: updateDataDto.roles,
          facultyId: updateDataDto.facultyId as number,
          semesterId: updateDataDto.semesterId as number,
        },
      });
      return plainToInstance<UserDto, User>(
        UserDto,
        { ...updatedUser },
        { excludeExtraneousValues: true },
      );
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException();
      }
      throw error;
    }
  }

  public async deleteUser(userToDeleteId: number) {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: userToDeleteId,
        deletedAt: null,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    try {
      await this.prismaService.user.update({
        where: {
          id: userToDeleteId,
        },
        data: {
          deletedAt: new Date(),
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException();
      }
      throw error;
    }
  }

  public async getUserSubjects(userId: number, filter: UserSubjectsFilterDto) {
    return await this.prismaService.course.findMany({
      where: {
        deletedAt: null,
        semesterId: filter.semesterId,
        students: {
          some: {
            deletedAt: null,
            studentId: userId,
          },
        },
      },
      select: {
        id: true,
        title: true,
        code: true,
        credits: true,
        endType: true,
        semesterId: true,
      },
    });
  }

  public async getUserTaughtSubjects(
    userId: number,
    filter: UserSubjectsFilterDto,
  ) {
    return await this.prismaService.course.findMany({
      where: {
        deletedAt: null,
        semesterId: filter.semesterId,
        teachers: {
          some: {
            teacherId: userId,
          },
        },
      },
      select: {
        id: true,
        title: true,
        code: true,
        credits: true,
        endType: true,
        semesterId: true,
      },
    });
  }

  public async setUserProfilePicture(userId: number, path: string) {
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        profilePicture: path,
      },
    });
  }

  public async getProfilePicture(userId: number) {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        profilePicture: true,
      },
    });

    return user.profilePicture;
  }

  public async getUserTimetable(id: number, filter: UserTimetableFilterDto) {
    const courses = await this.prismaService.course.findMany({
      where: {
        deletedAt: null,
        semesterId: filter.semesterId,
        students: {
          some: {
            deletedAt: null,
            studentId: id,
          },
        },
      },
      select: {
        id: true,
        title: true,
        code: true,
        room: true,
        lectureDay: true,
        lectureStartTimeMin: true,
        lectureDurationMin: true,
      },
    });

    const seminars = await this.prismaService.seminarGroup.findMany({
      where: {
        deletedAt: null,
        course: {
          deletedAt: null,
          semesterId: filter.semesterId,
        },
        students: {
          some: {
            deletedAt: null,
            studentId: id,
          },
        },
      },
      select: {
        id: true,
        name: true,
        room: true,
        seminarGroupDay: true,
        seminarGroupDurationStartTimeMins: true,
        seminarGroupDurationMins: true,
        course: {
          select: {
            title: true,
            code: true,
          },
        },
      },
    });

    const timetableLectures: UserTimetableDto[] = courses.map((course) => {
      return {
        id: course.id,
        name: course.title,
        code: course.code,
        room: course.room,
        day: course.lectureDay,
        startTime: course.lectureStartTimeMin,
        duration: course.lectureDurationMin,
      };
    });

    const timetableSeminars: UserTimetableDto[] = seminars.map((seminar) => {
      return {
        id: seminar.id,
        name: seminar.course.title,
        code: seminar.course.code,
        room: seminar.room,
        day: seminar.seminarGroupDay,
        startTime: seminar.seminarGroupDurationStartTimeMins,
        duration: seminar.seminarGroupDurationMins,
        groupName: seminar.name,
      };
    });

    return [...timetableLectures, ...timetableSeminars].sort((a, b) => {
      const days = UserService.dayToInt(a.day) - UserService.dayToInt(b.day);
      if (days !== 0) return days;

      const startTime = a.startTime - b.startTime;
      if (startTime !== 0) return startTime;

      return a.duration - b.duration;
    });
  }

  private static dayToInt(day: Day): number {
    switch (day) {
      case Day.monday:
        return 1;
      case Day.tuesday:
        return 2;
      case Day.wednesday:
        return 3;
      case Day.thursday:
        return 4;
      case Day.friday:
        return 5;
      case Day.saturday:
        return 6;
      case Day.sunday:
        return 7;
    }
  }
}
