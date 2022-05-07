import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { prisma, UserRole } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from "argon2";
import { instanceToInstance, plainToClass } from 'class-transformer';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './dto';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) { }

    public async getUserDto(userId: number) {
        const user = this.prismaService.user.findFirst({
            where: {
                id: userId
            }
        });

        if (!user) {
            return new NotFoundException('User not found');
        }

        return plainToClass(UserDto, { ...user, password: "" }, { excludeExtraneousValues: true });
    }

    public async getAll() {
        return (await this.prismaService.user.findMany()).map((user, index, arr) =>
            plainToClass(UserDto, { ...user, password: "" }, { excludeExtraneousValues: true }));
    }

    public async updateUserHimself(userToUpdateId: number, updateDataDto: UserDto) {
        try {
            const hash = await argon.hash(updateDataDto.password);

            await this.prismaService.user.update({
                where: {
                    id: userToUpdateId
                },
                data: {
                    firstName: updateDataDto.firstName,
                    lastName: updateDataDto.lastName,
                    email: updateDataDto.email,
                    passwdHash: hash,
                }
            });

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new ForbiddenException();
            }
        }
    }

    public async updateUserAdmin(userToUpdateId: number, updateDataDto: UserDto) {
        try {
            const hash = await argon.hash(updateDataDto.password);

            updateDataDto.roles = Array.from(new Set(updateDataDto.roles));

            if (!updateDataDto.roles.includes(UserRole.user)) {
                updateDataDto.roles.push(UserRole.user);
            }

            await this.prismaService.user.update({
                where: {
                    id: userToUpdateId
                },
                data: {
                    firstName: updateDataDto.firstName,
                    lastName: updateDataDto.lastName,
                    email: updateDataDto.email,
                    passwdHash: hash,
                    roles: updateDataDto.roles,
                    facultyId: updateDataDto.facultyId,
                    semesterId: updateDataDto.semesterId
                }
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new ForbiddenException();
            }
        }
    }

    public async deleteUser(userToDeleteId: number) {
        try {
            await this.prismaService.user.delete({
                where: {
                    id: userToDeleteId
                }
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new ForbiddenException();
            }
        }
    }
}
