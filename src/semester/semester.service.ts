import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { plainToClass } from 'class-transformer';
import { PrismaService } from '../prisma/prisma.service';
import { SemesterDto } from './dto';

@Injectable()
export class SemesterService {
  constructor(private prismaService: PrismaService) {}

  public async create(semesterDto: SemesterDto) {
    try {
      const newSemester = await this.prismaService.semester.create({
        data: {
          semesterType: semesterDto.semesterType,
          year: semesterDto.year,
        },
      });

      return newSemester.id;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Already exists');
        }
      }
    }
  }

  public async findAll() {
    const semesters = await this.prismaService.semester.findMany();
    return semesters.map((semester, ind, arr) =>
      plainToClass(
        SemesterDto,
        { ...semester },
        { excludeExtraneousValues: true },
      ),
    );
  }

  public async findOne(id: number) {
    const semester = await this.prismaService.semester.findFirst({
      where: {
        id: id,
      },
    });

    if (!semester) {
      throw new NotFoundException('Semester does not exist');
    }

    return plainToClass(
      SemesterDto,
      { ...semester },
      { excludeExtraneousValues: true },
    );
  }

  public async update(id: number, updateSemesterDto: SemesterDto) {
    try {
      await this.prismaService.semester.update({
        where: {
          id: id,
        },
        data: {
          year: updateSemesterDto.year,
          semesterType: updateSemesterDto.semesterType,
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

  public async remove(id: number) {
    try {
      await this.prismaService.semester.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException();
      }
    }
  }
}
