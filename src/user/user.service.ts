import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import * as argon from "argon2";
import { instanceToInstance, plainToClass } from 'class-transformer';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './dto';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) { }

    public async getUser(userId: number) {
        return await this.prismaService.user.findFirst({
            where: {
                id: userId
            }
        });
    }

    public async updateUserHimself(userToUpdateId: number, updateDataDto: UserDto) {
        await this.checkExistsOrThrowException(userToUpdateId);

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
            }
        });
    }

    public async updateUserAdmin(userToUpdateId: number, updateDataDto: UserDto) {
        await this.checkExistsOrThrowException(userToUpdateId);

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
    }

    public async deleteUser(userToDeleteId: number) {
        await this.checkExistsOrThrowException(userToDeleteId);

        await this.prismaService.user.delete({
            where: {
                id: userToDeleteId
            }
        });
    }

    public async getUserDto(userId: number) {
        const user = await this.checkExistsOrThrowException(userId);

        return plainToClass(UserDto,{...user, password: ""},{ excludeExtraneousValues: true });
    }

    private async checkExistsOrThrowException(userToDeleteId: number) {
        const user = await this.prismaService.user.findFirst({
            where: {
                id: userToDeleteId
            }
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user
    }
}
