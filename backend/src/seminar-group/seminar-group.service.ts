import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSeminarGroupDto } from './dto/create-seminar-group.dto';
import { UpdateSeminarGroupDto } from './dto/update-seminar-group.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User, UserRole } from '@prisma/client';
import { SeminarGroupRemoveTutorDto } from './dto/seminar-group.remove.tutor.dto';

@Injectable()
export class SeminarGroupService {
  constructor(private prismaService: PrismaService) {}

  private async validateUser(user: User, groupId: number) {
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

    if (group == null) {
      throw new NotFoundException();
    }

    if (
      !user.roles.includes(UserRole.admin) &&
      group.course.creatorId != user.id
    ) {
      throw new ForbiddenException();
    }
  }

  create(createSeminarGroupDto: CreateSeminarGroupDto) {
    return 'This action adds a new seminarGroup';
  }

  findOne(id: number) {
    const group = this.prismaService.seminarGroup.findFirst({
      where: {
        id: id,
        deletedAt: null,
      },
      select: {
        id: true,
        seminarGroupDay: true,
        seminarGroupDurationStartTimeMins: true,
        seminarGroupDurationMins: true,
        capacity: true,
        room: true,
        course: {
          select: {
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
        },
      },
    });

    if (group == null) throw new NotFoundException();
    return group;
  }

  update(id: number, updateSeminarGroupDto: UpdateSeminarGroupDto) {
    return `This action updates a #${id} seminarGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} seminarGroup`;
  }

  public async removeTutorFromSemGroup(
    user: User,
    id: number,
    tutor: SeminarGroupRemoveTutorDto,
  ) {
    await this.validateUser(user, id);

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
}
