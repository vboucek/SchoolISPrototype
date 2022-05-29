import { Injectable } from '@nestjs/common';
import { CreateSeminarGroupDto } from './dto/create-seminar-group.dto';
import { UpdateSeminarGroupDto } from './dto/update-seminar-group.dto';
import { PrismaService } from '../prisma/prisma.service';
import { SeminarGroupPreviewDto } from './dto/seminar-group-preview.dto';

@Injectable()
export class SeminarGroupService {
  constructor(private prismaService: PrismaService) {}

  create(createSeminarGroupDto: CreateSeminarGroupDto) {
    return 'This action adds a new seminarGroup';
  }

  public async getAllPreviews(
    courseId: number,
  ): Promise<SeminarGroupPreviewDto[]> {
    const groups = await this.prismaService.seminarGroup.findMany({
      where: {
        deletedAt: null,
        courseId: courseId,
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
        },
      },
    });

    return groups.map((group) => {
      const { tutors, ...rest } = group;
      return { ...rest, tutors: tutors.map((tutor) => tutor.tutor.lastName) };
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} seminarGroup`;
  }

  update(id: number, updateSeminarGroupDto: UpdateSeminarGroupDto) {
    return `This action updates a #${id} seminarGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} seminarGroup`;
  }
}
