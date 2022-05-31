import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User, UserRole } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './dto';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateUserDto } from './dto/user-update-user.dto';
import { UserSubjectsFilterDto } from './dto/user-subjects-filter.dto';
import { AdminUpdateUserDto } from './dto/admin-update-user.dto';

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

  public async getAll() {
    const users = await this.prismaService.user.findMany({
      where: {
        deletedAt: null,
      },
    });

    return users.map((user) =>
      plainToInstance<UserDto, User>(
        UserDto,
        { ...user },
        { excludeExtraneousValues: true },
      ),
    );
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
}
